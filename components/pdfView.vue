<template>
    <v-file-input @change="updatePDFFile" label="PDF:" variant="underlined"></v-file-input>
    <v-btn class="my-3 text-none" :color="themeColor" @click="processE2E" :disabled="!user | !pdfFile">Go</v-btn>
    Sign in to procced your own sample
    <div v-if="resp" class="my-6">
        <ParsedForm :raw-data="resp"/>
    </div>
    <div class="dflex flex-row space-x-1">
        <!-- <v-btn @click="uploadPDF" class="text-none" :color="themeColor" >Upload</v-btn>
        <v-btn @click="callOCR" :color="themeColor">OCR</v-btn>
        <v-btn @click="callGPT" :color="themeColor">GPT</v-btn> -->
        <v-btn @click="saveToDB" :color="themeColor" rounded="" class="text-none">Save results</v-btn>
    </div>

    <input type="text">

    <hr>
    Status: {{ status }}<br>
    Error: {{ error }}<br>

    <hr>
    <div class="max-w-90">
        <VuePDF :pdf="pdf" :page="1" :fit-parent="true" />
    </div>
    <v-text-field v-model="url" variant="underlined " clearable></v-text-field>
    <v-text-field v-model="content" variant="underlined" clearable></v-text-field>
    <hr>



</template>
<script setup>

import { VuePDF, usePDF } from '@tato30/vue-pdf'
const appConfig = useAppConfig();
const themeColor = appConfig.theme.primaryColor
const pdfSource = ref('/document.pdf')
const pdfFile = ref(null)
const content = ref(null)
const filename = ref('')
const resp = ref(Object)
const status = ref('Ready')
const error = ref('')
const url = ref('')
const { pdf, pages } = usePDF(pdfSource)
content.value = "quest LABORATORIES\nYOUR PARTNER IN LABORATORY SERVICES\nQuest Laboratories Pte Ltd (Co.Reg.No: 199500124E) Main Lab: 67 Ubi Ave 1, Nth Wing #07-01 to 07, 09 & 10 Starhub Green Singapore 408942. Tel: 6275 5501 Fax: 62770220 Satellite Lab: 290 Orchard Road #17-07/08/09, The Paragon Singapore 238859. Tel: 6737 2788 Fax: 6887 3249\nMHC MEDICAL CENTRE 100 TRAS ST, #15-01 AMARA CORPORATE TOWER SIN 079027\nLIU CHAORAN\nI/C\nS8877838C\n32 Years\nMale\nRef No: 000000\n000000\nQuest Ref: QM151 [ S80 ]\nINFLAMMATORY MARKERS\nRESULT\n1.12\nUNIT\nmg/L\nwr-CRP\n宽范围c-反应蛋白\nCardio-Vascular Disease (CVD) Risk Factor/Inflammatory:\nLess than 1.0 mg/L Low Risk for CVD Between 1.0-3.0 mg/L Average Risk for CVD Greater than 3.0 mg/L Increased Risk for CVD Greater than 5.0 mg/L Suggestion of infection/other sources of inflammation\nHEPATITIS B PROFILE HP01\nHEPATITIS PROFILE\nRESULT\nUNIT\nHepatitis Bs Antigen\nB型肝炎表面抗原\nB型肝炎表面抗体\nHepatitis Bs Antibody\nNon-Reactive\nNon-Reactive\nmlU/mL\nHEALTH SCREEN (MHC42H)\nLIPID PROFILE\nDate:\n08/08/20\nRequest No:\n2470301\nTotal Cholesterol\n总胆固醇\n131\nHDL Cholesterol\nLDL Cholesterol\nCholesterol/HDL Ratio\n高脂蛋白(好)胆固醇\n* 31\n低脂蛋白(坏)胆固醇\n60\n总胆固醇/高脂蛋白比率\n4.2\nTriglycerides\n三酸甘油脂\n* 204\nRemarks: Please refer to the MOH Clinical Practice Guideline 2/2016 on Lipids for the full classification of total cholesterol. HDL, LDL and triglyceride requirements.\nDIABETES MELLITUS PROFILE\nDate:\n08/08/20\nRequest No:\n2470301\n葡萄糖\n94\nGlucose (Fasting)\nLABORATORY\nREPORT\nRequested: 08/08/20 14:48\nReported: 08/08/20 16:55\nPrinted:\n08/08/20\nLab No:\n20-2470301\nRun: 30472-6 Page 1 of 5\nREF.RANGE\nREF.RANGE\n≥10 Reactive\nUNIT\nREF.RANGE\nmg/dl (< 200) Desirable mg/dl (> 59) Optimal mg/dl (< 100) Optimal (< 4.6) mg/dl (< 150) Optimal\nUNIT\nmg/dL\n(70-108)\nREF.RANGE\nThis is a computer generated report. No signature required. LABORATORY REPORT\nRequested: 08/08/20 14:48 Reported: 08/08/20 16:55"

import { useFirebaseStorage, useDatabaseObject, useDatabase } from 'vuefire'
import { ref as storageRef } from 'firebase/storage'
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { $on } from 'vue-happy-bus'

const storage = useFirebaseStorage()
const db = useDatabase()
const user = await getCurrentUser()

url.value = 'https://firebasestorage.googleapis.com/v0/b/med-doc-parser.appspot.com/o/pdfs%2Fc8PwPf67HTcrhBVWghqFQ7SEmpI2%2F2020-08-15.pdf?alt=media&token=7ad5f4e2-210e-47e5-8631-bfe040c91c12'

resp.value = JSON.parse(`{
    "test_date": "2020-08-08",
    "test_results": [
        {
            "category": "INFLAMMATORY MARKERS",
            "name": "wr-CRP",
            "value": 1.12,
            "unit": "mg/L",
            "reference range": "Less than 1.0 mg/L Low Risk for CVD Between 1.0-3.0 mg/L Average Risk for CVD Greater than 3.0 mg/L Increased Risk for CVD Greater than 5.0 mg/L Suggestion of infection/other sources of inflammation"
        },
        {
            "category": "HEPATITIS B PROFILE",
            "name": "Hepatitis Bs Antigen",
            "value": "Non-Reactive",
            "unit": "mlU/mL",
            "reference range": ""
        }]}`)

$on('parsedData', (d) => {
    resp.value = d
})

const uploadPDF = async () => {
    status.value = 'Uploading'
    const path = `pdfs/${user.uid}/${pdfFile.value.name}`
    const mountainFileRef = storageRef(storage, path)
    const snapshot = await uploadBytes(mountainFileRef, pdfFile.value)
    const url_ = await getDownloadURL(mountainFileRef)
    url.value = url_
    status.value = 'Ready'
}

const callOCR = async () => {
    const t0 = new Date()
    status.value = 'OCRing'
    content.value = ''

    const { data } = await useFetch('/api/ocr', {
        // query: { url: url.value }
        method: 'POST',
        body: { url: url.value }
    })
      
    console.log(data.value)
    if(data){
        content.value = data.value.content
    }
    
    const t1 = new Date()
    const elapsed = (t1 - t0) / 3600
    status.value = elapsed.toFixed(1) + ' sec'
}

const callGPT = async () => {
    const t0 = new Date()
    status.value = 'GPTing'
    resp.value = null
    let data
    let status_
    let error_
    try {
        const { data:d } = await useFetch('/api/gpt', {
            params: { query: content.value },
            timeout: 30000 // timeout in 30 sec
        })
        data = d
        const t1 = new Date()
        const elapsed = (t1 - t0) / 1000
        status_ = 'completed in '+elapsed.toFixed(1) + ' sec'
    } catch (e) {
        const t1 = new Date()
        const elapsed = (t1 - t0) / 1000
        status_ = 'aborted in '+elapsed.toFixed(1) + ' sec'
        error_ = e
    } 
    status.value = status_
    error.value = error_
    console.log(data.value.content)
    resp.value = JSON.parse(data.value.content)
    
}

const updatePDFFile = (e) => {
    const files = e.target.files
    pdfFile.value = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
        const arrayBuffer = e.target.result
        const uint8Array = new Uint8Array(arrayBuffer);
        pdfSource.value = uint8Array

    }
    if (!files.length)
        return;
    
    filename.value = files[0].name
}

const processE2E = async () =>{
    await uploadPDF()
    await callOCR()
    await callGPT()
}

import { ref as dbRef, set } from 'firebase/database'
const saveToDB = () => {
    console.log('saving DB')
    if(user){
        set(dbRef(db, `lab_result/${user.uid}/${resp.value.test_date}`), resp.value.test_results).then( () => {
            console.log('record saved')
        })
    }
}

</script>
