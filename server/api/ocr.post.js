import { AzureKeyCredential, DocumentAnalysisClient} from "@azure/ai-form-recognizer";
import { getQuery, readBody } from "h3"

const getOCRTextFromFile = async(url, client) => {
    // const file = fs.createReadStream(body)
    // const poller = await client.beginAnalyzeDocument("prebuilt-read", body);
    const poller = await client.beginAnalyzeDocumentFromUrl(
      "prebuilt-read", url
    )
    const {content, pages, languages, styles } = await poller.pollUntilDone();

    return {
        content:content,
        pages:pages,
        languages: languages,
        styles: styles,
    }
}

export default defineEventHandler( async(event) => {
    const config = useRuntimeConfig()
    console.log(config.azure_ocr_endpoint)
    console.log(config.azure_ocr_key)
    // const { url } = getQuery(event)
    const { url } = await readBody(event)
    console.log(url)
    const client = new DocumentAnalysisClient(config.azure_ocr_endpoint, new AzureKeyCredential(config.azure_ocr_key));
    const result = await getOCRTextFromFile(url, client)
    return result
})



