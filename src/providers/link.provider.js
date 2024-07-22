import axios from "axios";
import cheerio from "cheerio";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/** url정보 가져오기 */
export const fetchUrlContent = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $('title').text();
        const metaDescription = $('meta[name="description"]').attr('content');
        const mainHeading = $('h1').first().text();
        const firstParagraph = $('p').first().text();
        const content = `${title} ${metaDescription} ${mainHeading} ${firstParagraph}`.trim();

        console.log('content 추출 내용:', content);
        return { title, metaDescription, mainHeading, firstParagraph, content };
    } catch (error) {
        console.error('Error fetching URL content:', error);
        return null;
    }
}
/** 요약 정보를 통해 gpt로 사이트 추측 */
export const getGptResponse = async (summary) => {
    console.log('summary:', summary);

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "Your role is to summarize url's information" },
            { role: "user", content: `다음은 사용자가 입력한 url의 메타 정보 및 텍스트 정보를 추출한 정보입니다. 이 정보를 보고 사용자가 입력한 url이 어떤 링크인지 정리해서 설명해주세요: ${summary}` }
        ],
        max_tokens: 300
    });

    return completion.choices[0].message.content;
}