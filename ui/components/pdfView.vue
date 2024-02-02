<template>
    <label for="pdf-file">PDF:</label>
    <input type="file" id="pdf-file" @change="updatePDFFile" accept=".pdf"/>
    <button @click="uploadPDF">Upload</button>
    <button @click="callOCR">OCR</button>
    <button @click="callGPT">GPT</button>
    <VuePDF :pdf="pdf" :page="1" />
    {{ uploadProgress }}
    {{ url }}
    <hr>
    {{ content }}
    <hr>
    <div v-if="resp">
        {{ resp.test_date }}
        <table>
            <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Value</th>
                <th>Unit</th>
            </tr>
            <tr v-for="row in resp.test_results">
                <td>{{ row.category }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.value }}</td>
                <td>{{ row.unit }}</td>
            </tr>
        </table>
    </div>


</template>
<script setup>
import { VuePDF, usePDF } from '@tato30/vue-pdf'
const pdfSource = ref('/document.pdf')
const pdfFile = ref(null)
const content = ref(null)
const resp = ref(Object)
const { pdf, pages } = usePDF(pdfSource)
content.value = "quest LABORATORIES\nYOUR PARTNER IN LABORATORY SERVICES\nQuest Laboratories Pte Ltd (Co.Reg.No: 199500124E) Main Lab: 67 Ubi Ave 1, Nth Wing #07-01 to 07, 09 & 10 Starhub Green Singapore 408942. Tel: 6275 5501 Fax: 62770220 Satellite Lab: 290 Orchard Road #17-07/08/09, The Paragon Singapore 238859. Tel: 6737 2788 Fax: 6887 3249\nMHC MEDICAL CENTRE 100 TRAS ST, #15-01 AMARA CORPORATE TOWER SIN 079027\nLIU CHAORAN\nI/C\nS8877838C\n32 Years\nMale\nRef No: 000000\n000000\nQuest Ref: QM151 [ S80 ]\nINFLAMMATORY MARKERS\nRESULT\n1.12\nUNIT\nmg/L\nwr-CRP\n宽范围c-反应蛋白\nCardio-Vascular Disease (CVD) Risk Factor/Inflammatory:\nLess than 1.0 mg/L Low Risk for CVD Between 1.0-3.0 mg/L Average Risk for CVD Greater than 3.0 mg/L Increased Risk for CVD Greater than 5.0 mg/L Suggestion of infection/other sources of inflammation\nHEPATITIS B PROFILE HP01\nHEPATITIS PROFILE\nRESULT\nUNIT\nHepatitis Bs Antigen\nB型肝炎表面抗原\nB型肝炎表面抗体\nHepatitis Bs Antibody\nNon-Reactive\nNon-Reactive\nmlU/mL\nHEALTH SCREEN (MHC42H)\nLIPID PROFILE\nDate:\n08/08/20\nRequest No:\n2470301\nTotal Cholesterol\n总胆固醇\n131\nHDL Cholesterol\nLDL Cholesterol\nCholesterol/HDL Ratio\n高脂蛋白(好)胆固醇\n* 31\n低脂蛋白(坏)胆固醇\n60\n总胆固醇/高脂蛋白比率\n4.2\nTriglycerides\n三酸甘油脂\n* 204\nRemarks: Please refer to the MOH Clinical Practice Guideline 2/2016 on Lipids for the full classification of total cholesterol. HDL, LDL and triglyceride requirements.\nDIABETES MELLITUS PROFILE\nDate:\n08/08/20\nRequest No:\n2470301\n葡萄糖\n94\nGlucose (Fasting)\nLABORATORY\nREPORT\nRequested: 08/08/20 14:48\nReported: 08/08/20 16:55\nPrinted:\n08/08/20\nLab No:\n20-2470301\nRun: 30472-6 Page 1 of 5\nREF.RANGE\nREF.RANGE\n≥10 Reactive\nUNIT\nREF.RANGE\nmg/dl (< 200) Desirable mg/dl (> 59) Optimal mg/dl (< 100) Optimal (< 4.6) mg/dl (< 150) Optimal\nUNIT\nmg/dL\n(70-108)\nREF.RANGE\nThis is a computer generated report. No signature required. All results should be correlated/interpreted with patient's clinical findings. Selected Biochemical and Immunological tests are performed at Paragon Satellite Lab.\nDr. Tan Hong Wui MBBS. MRCPath, FRCPath Pathologist, Medical Director\nDr. Ivy Chew MBBS. FRCPath(UK), FAMS Pathologist\nquest ·LABORATORIES\nYOUR PARTNER IN LABORATORY SERVICES\nQuest Laboratories Pte Ltd (Co.Reg.No: 199500124E) Main Lab: 67 Ubi Ave 1, Nth Wing #07-01 to 07, 09 & 10 Starhub Green Singapore 408942. Tel: 6275 5501 Fax: 62770220\nSatellite Lab: 290 Orchard Road #17-07/08/09, The Paragon Singapore 238859. Tel: 6737 2788 Fax: 6887 3249\nMHC MEDICAL CENTRE 100 TRAS ST, #15-01 AMARA CORPORATE TOWER SIN 079027\nLIU CHAORAN I/C S8877838C\n32 Years Male Ref No: 000000 000000\nQuest Ref: QM151 [ S80 ]\nLIVER PROFILE\nRESULT\nUNIT\nTotal Protein\n总蛋白质\nAlbumin\n白蛋白\nGlobulin\n球蛋白\nA/G Ratio\n白蛋白/球蛋白比率\n1.9\nBilirubin, total\n总胆红素\nAlkaline Phosphatase\n碱性磷酸酵素\n61\nSGPT/ALT\n丙胺酸转氨酵素\nSGOT/AST\n天冬胺酸转氨酵素\n21\nGamma GT\n珈玛-麸胺转酸酵素\n* 72\n7.5\n4.9\ng/dL\n(6.0-8.2)\ng/dL\n(3.5-5.0)\n2.6\ng/dL\n(2.0-3.4)\n0.6\n(0.2-1.4)\nmg/dL\nU/L\n(< 130)\n32\nU/L\n(< 37)\nU/L\n(< 41)\nU/L\n(< 51)\nBONE/JOINT FUNCTION\nRESULT\nUNIT\nPhosphate\n无机磷\nCalcium\n钙\nUric Acid\n尿酸\nRheumatoid Factor\n类风湿因子\n3.4\nmg/dL\n(2.0-4.5)\n9.4\nmg/dL\n(8.4-10.4)\nmg/dL\n(3.7-9.1)\n6.7\n< 20\nIU/mL\n<20 Negative\nKIDNEY PROFILE\nRESULT\nUNIT\nSodium\nPotassium\n钠钾\nChloride\n氯化物\nUrea\n尿素\n20\n145\nmmol/L\n(136-145)\nmmol/L\n(3.3-5.1)\nmmol/L\n(95-110)\nmg/dL\n(15-48)\n4.4\n103\nSERUM CREATININE\nDate:\n08/08/20\nRequest No:\n2470301\nCreatinine\neGFR\n肌酸酐\n0.86\n肾小球滤过率估计值\n> 60\nLABORATORY REPORT\nRequested: 08/08/20 14:48 Reported: 08/08/20 16:55\nPrinted:\n08/08/20\nLab No:\n20-2470301\nRun: 30472-9 Page 2 of 5\nREF.RANGE\n(1.3-2.4)\nREF.RANGE\nREF.RANGE\nUNIT\nREF.RANGE\nmg/dL\n(0.57-1.36)\nmL/min/1.73m2\nThis is a computer generated report. No signature required. All results should be correlated/interpreted with patient's clinical findings. Selected Biochemical and Immunological tests are performed at Paragon Satellite Lab.\nDr. Tan Hong Wui MBBS, MRCPath, FRCPath Pathologist, Medical Director\nDr. Ivy Chew MBBS, FRCPath(UK), FAMS Pathologist"
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { ref as storageRef } from 'firebase/storage'

const filename = pdfFile.value ? pdfFile.value.name : null
const storage = useFirebaseStorage()
const mountainFileRef = storageRef(storage, `pdfs/${filename}`)
const { url, uploadProgress, upload } = useStorageFile(mountainFileRef)
url.value = `https://firebasestorage.googleapis.com/v0/b/med-doc-parser.appspot.com/o/pdfs%2Fnull?alt=media&token=0eb6e225-dc69-4c20-ae1a-203d69a4d705`

resp.value = JSON.parse(`{ "test_date": "2020-08-08", "test_results": [ { "category": "INFLAMMATORY MARKERS" }, { "name": "wr-CRP" }, { "value": "1.12" }, { "unit": "mg/L" }, { "reference range": "Less than 1.0 mg/L Low Risk for CVD Between 1.0-3.0 mg/L Average Risk for CVD Greater than 3.0 mg/L Increased Risk for CVD Greater than 5.0 mg/L Suggestion of infection/other sources of inflammation" }, { "category": "HEPATITIS B PROFILE HP01" }, { "name": "Hepatitis Bs Antigen" }, { "value": "Non-Reactive" }, { "unit": "" }, { "reference range": "" }, { "name": "Hepatitis Bs Antibody" }, { "value": "Non-Reactive" }, { "unit": "mlU/mL" }, { "reference range": "" }, { "category": "LIPID PROFILE" }, { "name": "Total Cholesterol" }, { "value": "131" }, { "unit": "" }, { "reference range": "" }, { "name": "HDL Cholesterol" }, { "value": "31" }, { "unit": "" }, { "reference range": "" }, { "name": "LDL Cholesterol" }, { "value": "60" }, { "unit": "" }, { "reference range": "" }, { "name": "Cholesterol/HDL Ratio" }, { "value": "4.2" }, { "unit": "" }, { "reference range": "" }, { "name": "Triglycerides" }, { "value": "204" }, { "unit": "" }, { "reference range": "" }, { "category": "DIABETES MELLITUS PROFILE" }, { "name": "Glucose (Fasting)" }, { "value": "94" }, { "unit": "" }, { "reference range": "" }, { "category": "LIVER PROFILE" }, { "name": "Total Protein" }, { "value": "7.5" }, { "unit": "g/dL" }, { "reference range": "(6.0-8.2)" }, { "name": "Albumin" }, { "value": "4.9" }, { "unit": "g/dL" }, { "reference range": "(3.5-5.0)" }, { "name": "Globulin" }, { "value": "2.6" }, { "unit": "g/dL" }, { "reference range": "(2.0-3.4)" }, { "name": "A/G Ratio" }, { "value": "0.6" }, { "unit": "" }, { "reference range": "(0.2-1.4)" }, { "name": "Bilirubin, total" }, { "value": "1.9" }, { "unit": "mg/dL" }, { "reference range": "" }, { "name": "Alkaline Phosphatase" }, { "value": "61" }, { "unit": "U/L" }, { "reference range": "(< 130)" }, { "name": "SGPT/ALT" }, { "value": "32" }, { "unit": "U/L" }, { "reference range": "(< 37)" }, { "name": "SGOT/AST" }, { "value": "21" }, { "unit": "U/L" }, { "reference range": "(< 41)" }, { "name": "Gamma GT" }, { "value": "72" }, { "unit": "U/L" }, { "reference range": "(< 51)" }, { "category": "BONE/JOINT FUNCTION" }, { "name": "Phosphate" }, { "value": "3.4" }, { "unit": "mg/dL" }, { "reference range": "(2.0-4.5)" }, { "name": "Calcium" }, { "value": "9.4" }, { "unit": "mg/dL" }, { "reference range": "(8.4-10.4)" }, { "name": "Uric Acid" }, { "value": "6.7" }, { "unit": "mg/dL" }, { "reference range": "(3.7-9.1)" }, { "name": "Rheumatoid Factor" }, { "value": "< 20" }, { "unit": "IU/mL" }, { "reference range": "<20 Negative" }, { "category": "KIDNEY PROFILE" }, { "name": "Sodium" }, { "value": "145" }, { "unit": "mmol/L" }, { "reference range": "(136-145)" }, { "name": "Potassium" }, { "value": "4.4" }, { "unit": "mmol/L" }, { "reference range": "(3.3-5.1)" }, { "name": "Chloride" }, { "value": "103" }, { "unit": "mmol/L" }, { "reference range": "(95-110)" }, { "name": "Urea" }, { "value": "32" }, { "unit": "mg/dL" }, { "reference range": "(15-48)" }, { "name": "SERUM CREATININE" }, { "value": "0.86" }, { "unit": "mg/dL" }, { "reference range": "(0.57-1.36)" }, { "name": "eGFR" }, { "value": "> 60" }, { "unit": "mL/min/1.73m2" }, { "reference range": "" } ] }`)

const uploadPDF = async() =>{
    const data = pdfFile.value
    if (data){
        upload(data)
    }    
}

const callOCR = async() => {
    const { data } = await useFetch('/api/ocr', {
        params: { url }
    })
    console.log(data.value)
    content.value = data.value.content
}

const callGPT = async() => {
    const { data } = await useFetch('/api/gpt', {
        params: { query: content.value }
    })
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
        return ;
    console.log(files[0])
    console.log(files[0].size)
    reader.readAsArrayBuffer(files[0])

}




</script>
