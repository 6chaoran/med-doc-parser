<template>
    <div class="flex flex-col">
        <Notification :show="showNotification" class="z-10"/>
        <div v-if="status" class="mb-3">
            {{ status }}
            <v-progress-linear v-model="progress"></v-progress-linear>
        </div>

        <div v-if="parsed" class="space-y-3">
            <ParsedForm :raw-data="parsed" />
            <v-btn @click="saveToDB" :color="themeColor" rounded="" class="text-none" prepend-icon="mdi-content-save">Save</v-btn>
        </div>

        <div class="flex space-x-3 max-w-[400px]">
            <v-file-input @change="updateFile" v-model="imgFiles" @click:clear="clearFile" label="Medical Report"
                variant="underlined" :accept="['.png', '.jpg', '.pdf']"></v-file-input>
            <v-btn class="my-3 text-none" rounded="lg" :color="themeColor" @click="processE2E"
                :disabled="!user || !fileType || quota < 1">Go ({{ quota }})</v-btn> 
       
        </div>

        <DialogBase :open="true" 
            v-if="quota < 1"
            title="" 
            text="You have used up your daily quota" >
            <v-icon class="mt-3 ml-3" color="orange">mdi-alert</v-icon>
        </DialogBase>

        <div class="flex justify-center px-3">
            <img :src="uploadedImg" v-if="fileType == 'image'" class="max-h-[600px]">
            <VuePDF :pdf="pdf" :page="1" :fit-parent="true" v-if="fileType == 'pdf'" class="max-h=[600px]" />
        </div>
    </div>
</template>

<script setup>

import { VuePDF, usePDF } from '@tato30/vue-pdf'
const pdfSource = ref(null)
const { pdf, pages } = usePDF(pdfSource)

import { ref as storageRef } from 'firebase/storage'
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { md5 } from 'js-md5';

const storage = useFirebaseStorage()
const db = useDatabase()
const appConfig = useAppConfig();
const themeColor = appConfig.theme.primaryColor
const uploadedImg = ref(null)
const imgFiles = ref([])
const fileType = ref(null)
const status = ref(null)
const url = ref(null)
const showNotification = ref(false)
const uploadedFilePath = ref(null)
const progress = ref(0)

const text = ref(null) //OCRed Text
const parsed = ref(null) //parsed Json object string
// parsed.value = JSON.parse(`{
//     "test_date": "2020-08-18",
//     "test_results": [
//         {
//             "category": "INFLAMMATORY MARKERS",
//             "name": "wr-CRP",
//             "value": 1.12,
//             "unit": "mg/L",
//             "reference range": "Less than 1.0 mg/L Low Risk for CVD Between 1.0-3.0 mg/L Average Risk for CVD Greater than 3.0 mg/L Increased Risk for CVD Greater than 5.0 mg/L Suggestion of infection/other sources of inflammation"
//         },
//         {
//             "category": "HEPATITIS B PROFILE",
//             "name": "Hepatitis Bs Antigen",
//             "value": "Non-Reactive",
//             "unit": "mlU/mL",
//             "reference range": ""
//         }]}`)

const parsedPostProcessed = computed( () => {
    if(parsed.value){
        const date = parsed.value.test_date.replaceAll('/', '-')
        const results = parsed.value.test_results
        const source = { source: url.value, ingested_time: new Date().toLocaleString() }
        const resultsWithIds = results.reduce((a, v) => ({ ...a, [(v.category + '|' + v.name).replaceAll('/', '-')]: {...v, ...source}}), {}) 
        return { test_date: date, test_results: resultsWithIds}
    } else {
        return null
    }
})

const user = useCurrentUser()

const loadImage = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        uploadedImg.value = e.target.result
    }
    reader.readAsDataURL(file)
}

const loadPDF = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        const arrayBuffer = e.target.result
        const uint8Array = new Uint8Array(arrayBuffer);
        pdfSource.value = uint8Array
    }
    reader.readAsArrayBuffer(file)
}

const fileCheckSum = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        const binary = e.target.result
        const hash = md5(binary)
        const path = `pdfs/${user.value.uid}/${hash}_${file.name}`
        uploadedFilePath.value = path
    }
    reader.readAsBinaryString(file)
}

const updateFile = () => {

    const file = imgFiles.value[0]

    if (file.type == 'image/png' || file.type == 'image/jpeg') {
        fileType.value = 'image'
        loadImage(file)
    }
    if (file.type == 'application/pdf') {
        fileType.value = 'pdf'
        loadPDF(file)
    }
    fileCheckSum(file)
}
const clearFile = () => {
    pdfSource.value = null
    uploadedImg.value = null
    fileType.value = null
    parsed.value = null
    uploadedFilePath.value = null
}

const uploadFile = async () => {
    status.value = 'Uploading'
    const file = imgFiles.value[0]
    const fileRef = storageRef(storage, uploadedFilePath.value)
    const snapshot = await uploadBytes(fileRef, file)
    url.value = await getDownloadURL(fileRef)
    status.value = 'Ready'
}

const callOCR = async () => {
    const t0 = new Date()
    status.value = 'OCRing'
    text.value = null

    const { data } = await useFetch('/api/ocr', {
        method: 'POST',
        body: { url: url.value }
    })

    console.log(data.value)
    if (data) {
        text.value = data.value.content
    }

    const t1 = new Date()
    const elapsed = (t1 - t0) / 3600
    status.value = elapsed.toFixed(1) + ' sec'
}

const callGPT = async () => {
    const t0 = new Date()
    status.value = 'GPTing'
    parsed.value = null

    const { data } = await useFetch('/api/gpt', {
        params: { query: text.value },
        timeout: 30000 // timeout in 30 sec
    })
    const t1 = new Date()
    const elapsed = (t1 - t0) / 1000
    status.value = 'completed in ' + elapsed.toFixed(1) + ' sec'

    console.log(data.value.content)
    parsed.value = JSON.parse(data.value.content)
}

const processE2E = async () => {
    progress.value = 0
    await uploadFile()
    progress.value = 10
    await callOCR()
    progress.value = 50
    await callGPT()
    progress.value = 100
    updateQuota()
}

import { ref as dbRef, set, push, get, update } from 'firebase/database'
const recRef = computed(() => {
    const test_date = parsed.value ? parsed.value.test_date : null
    const ref_ = dbRef(db, `lab_result/${user.value.uid}/${test_date}`)
    return user.value ? ref_ : null
})

const saveToDB = () => {
    console.log('saving DB')

    if (user) {
        update(recRef.value, parsedPostProcessed.value.test_results).then(
            () => {
            console.log('record saved')
            showNotification.value = true
        })
        setTimeout(() => {
            showNotification.value = false
        }, 2000)

        clearFile()
    }
}


const quota = ref(null)
const usage = ref(null)
const today = (new Date()).toLocaleDateString('en-CA')
const quotaRef = dbRef(db, `quota/${user.value.uid}/${today}`)
const getQuota = async () => {
    const a = (await get(quotaRef)).toJSON()
    console.log(a)
    quota.value = a?.quota ?? 10
    usage.value = a?.usage ?? 0
}

const updateQuota = () => {
    quota.value -= 1
    usage.value += 1
    set(quotaRef, {
        quota: quota.value,
        usage: usage.value,
    })
}

onMounted( () => {
    getQuota()
})



</script>