import { Configuration, OpenAIApi } from 'openai-edge'
import { getQuery } from "h3";
let openai

export const config = {
  runtime: 'edge'
}

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig(event);
  const OPENAI_API_KEY = config.openai_api_key
  if (!openai) {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY
    })
    openai = new OpenAIApi(configuration)
  }

    const { query } = getQuery(event)
    const prompt = `Please extract the lab test result from the texts generated from medical test report via OCR system.
    Output a valid JSON object to compile with the given schema.

    JSON schema:
    '''
    {
        test_date: <YYYY-mm-dd>,
        test_results: [
          { category: string,
            name: string,
            value: number | string,
            unit: string,
            reference range: string
          }
        ]
    }
    '''

    Texts:
    '''
    ${query}
    '''

    valid JSON object:
    `
    console.log(query)
    const stream = await openai.createChatCompletion({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo-0125",
        temperature: 0,
        max_tokens: 2048,
        response_format: { "type": "json_object" },
        // stream: true,
    });

    return completion.choices[0].message
})




