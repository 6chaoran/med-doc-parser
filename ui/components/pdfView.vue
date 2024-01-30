<template>
    <label for="pdf-file">PDF:</label>
    <input type="file" id="pdf-file" @change="updatePDFFile" />
    <button @click="uploadPDF">Upload</button>
    <div v-for="page in pages" :key="page">
    <VuePDF :pdf="pdf" :page="page" />
  </div>
</template>
<script setup>
import { VuePDF, usePDF } from '@tato30/vue-pdf'
const pdfSource = ref('/document.pdf')
const { pdf, pages } = usePDF(pdfSource)

const uploadPDF = () =>{

}

const updatePDFFile = (e) => {
    const files = e.target.files
    const reader = new FileReader()
    reader.onload = (e) => {
        const arrayBuffer = e.target.result
        const uint8Array = new Uint8Array(arrayBuffer); 
        pdfSource.value = uint8Array

    }
    if (!files.length)
        return ;
    console.log(files[0])
    reader.readAsArrayBuffer(files[0])

}




</script>
