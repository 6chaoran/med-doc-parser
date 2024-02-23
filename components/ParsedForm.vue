<template>
    <div class="flex flex-col space-y-3">
        <div class="flex flex-row ">
            <label for="date" class="font-semibold mx-3">Test date: </label>
            <input id="date" type="text" v-model="data.test_date" class="px-3">
        </div>

        <table class="table-auto w-full border-collapse border">
            <thead>
                <tr>
                    <th></th>
                    <th class="w-2 text-left leading-6 px-3 border-2"></th>
                    <th class="w-1/2 text-left leading-6 px-3 border-2">Name</th>
                    <th class="w-1/4 text-left leading-6 px-3 border-2">Value</th>
                    <th class="text-left leading-6 px-3 border-2">Unit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row, idx in data.test_results">
                    <td class="border-2 px-1"><input class="w-full px-3" type="checkbox" :value="idx" v-model="selected">
                    </td>
                    <td class="border-2 text-center text-sm">{{ idx + 1 }}</td>
                    <td class="border-2 text-sm"><input class="w-full px-3" type="text" v-model="row.name"></td>
                    <td class="border-2 text-sm"><input class="w-full px-3" type="text" v-model="row.value"></td>
                    <td class="border-2 text-sm"><input class="w-full px-3" type="text" v-model="row.unit"></td>
                </tr>
            </tbody>
        </table>
        <div class="flex space-x-3 align-center">
            <v-btn class="bg-indigo text-none" @click="add" icon="mdi-plus" size="36"></v-btn>
            <v-btn class="bg-indigo text-none" rounded=""
            :disabled="selected.length == 0"
                @click="del" prepend-icon="mdi-minus">Delete {{ selected.length > 0 ? selected.length : '' }} selected
                rows</v-btn>

        </div>
    </div>
</template>
<script setup>
import { $emit } from 'vue-happy-bus'
const props = defineProps({
    rawData: Object
})
const selected = ref([])
console.log(props.rawData)
const data = ref(props.rawData)
// const data = ref({
//     test_date: '2024-01-01',
//     test_results: [
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
//         }]
// })
const add = () => {
    data.value.test_results.push({
        "category": " ",
        "name": " ",
        "value": " ",
        "unit": " ",
        "reference range": " "
    })
    emitParsedData()
}

const del = () => {
    const arr = data.value.test_results
    data.value.test_results = arr.filter(i => !selected.value.includes(arr.indexOf(i)))
    selected.value = []
    emitParsedData()
}

const emitParsedData = () => {
    $emit('parsedData', data.value)
}
</script>