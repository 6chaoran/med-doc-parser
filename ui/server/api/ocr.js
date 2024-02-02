import { AzureKeyCredential, DocumentAnalysisClient} from "@azure/ai-form-recognizer";

function* getTextOfSpans(content, spans) {
    for (const span of spans) {
      yield content.slice(span.offset, span.offset + span.length);
    }
  }

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
    const { url } = getQuery(event)
    console.log(url)
    const client = new DocumentAnalysisClient(config.azure_ocr_endpoint, new AzureKeyCredential(config.azure_ocr_key));
    const result = await getOCRTextFromFile(url, client)
    return result
})



