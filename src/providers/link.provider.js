import { BaseError } from "@config/error";
import { status } from "@config/response.status";
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
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "Your role is to summarize url's information" },
            { role: "user", content: `다음은 사용자가 입력한 url의 메타 정보 및 텍스트 정보를 추출한 정보입니다. 이 정보를 보고 사용자가 입력한 url이 어떤 링크인지 정리해서 설명해주세요: ${summary}` }
        ],
        max_tokens: 500
    });

    return completion.choices[0].message.content;
}
//응답 형태, summary, videoTitle, videoAuthor
export const getYoutubeSummary = async (url) => {
    const options = {
        method: 'GET',
        url: 'https://youtube-video-summarizer1.p.rapidapi.com/v1/youtube/summarizeVideoFromCache',
        params: {
            videoURL: url
        },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST,
        }
    };
    try{
        const response = await axios.request(options);
        
        return response.data;
    } catch (err){
        console.log('getYoutubeSummary error: ',err);
        throw err;
    }
}

export const getGptYoutubeSummary = async (youtubeSummary) => {
    const {summary, videoTitle, videoAuthor } = youtubeSummary;
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "Your role is to summarize youtube video content" },
            { role: "user", content: `다음은 사용자가 입력한 유튜브 url의 요약 내용입니다. 제목, 채널명, 비디오 내용 요약 등을 읽고 어떤 내용을 다루는 동영상인지 간략하게 정리해주세요.
                제목: ${videoTitle}, 채널명: ${videoAuthor}, 동영상 내용:${summary}` }
        ],
        max_tokens: 1000
    });

    return completion.choices[0].message.content;
}

export const getUrlThumb = async (url) => {
    if(!url){
        return null;
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const ogImage = $('meta[property="og:image"]').attr('content');

        return ogImage || null; //og:image가 없는 경우 null반환
    } catch (err) {
        console.log(err);
        return null; //url이 실제로 접속 불가능한 url이어도 에러 처리하지 않도록
    }
}

export const getUrlTitle = async (url) => {
    if (!url) {
        return null;
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $('title').text();

        return title || null; // 제목이 없는 경우 null 반환
    } catch (err) {
        console.log(err);
        return null; // url이 실제로 접속 불가능한 url이어도 에러 처리하지 않도록
    }
};