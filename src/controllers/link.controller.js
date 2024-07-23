import { response } from "../../config/response";
import { status } from "../../config/response.status";
import { BaseError } from "../../config/error";
import { generateUrlSummary } from "../services/link.service";


export const getSummary = async (req,res) => {
    const url = req.body.url;

    if (!url) { // 에러 메시지 추후 수정
        return BaseError(status.NOT_FOUND);
    }

    try {
        const AIResponse = await generateUrlSummary(url);
        res.send(response(status.SUCCESS, AIResponse ));
        console.log(`AI 응답: ${AIResponse}`);
    } catch (error) {
        return BaseError(status.BAD_REQUEST);
    }
}