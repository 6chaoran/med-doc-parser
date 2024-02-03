import OpenAI from "openai";
const openai = new OpenAI();
import { getQuery } from "h3";
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    console.log(config.openai_api_key)
    openai.apiKey = config.openai_api_key
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
    // console.log(query)
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo-0125",
        temperature: 0,
        max_tokens: 2048,
        response_format: { "type": "json_object" }
    });

    return completion.choices[0].message
    // return query
})




