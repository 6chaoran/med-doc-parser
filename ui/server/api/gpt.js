import OpenAI from "openai";
const openai = new OpenAI();
import { getQuery } from "h3";
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    console.log(config.openai_api_key)
    openai.apiKey = config.openai_api_key
    const { query } = getQuery(event)
    
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: query },
        ],
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message
    // return query
})




