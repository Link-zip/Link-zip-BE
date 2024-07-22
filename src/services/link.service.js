import { fetchUrlContent } from "../providers/link.provider";
import { getGptResponse } from "../providers/link.provider";
import { BaseError} from "../../config/error";
import { status } from "../../config/response.status";

export const summarizeContent = async (content, maxLength = 1000) => {
    if(!content || content.trim().length === 0) {
        return "페이지에서 유효한 정보를 찾을 수 없습니다."
    }
    /** 최대 글자 길이를 초과한 경우, 뒤 내용을 자르고 축약 */
    if (content.length > maxLength) {
        return content.substring(0, maxLength) + '...';
    }
    return content;
}
/** url 요약 정보 생성 */
export const generateUrlSummary = async (url) =>  {
    const content = await fetchUrlContent(url);
    if (!content) {
        throw new BaseError(status.NOT_FOUND);    
    }

    const summary = await summarizeContent(content.content, 300);
    const response = await getGptResponse(summary);
    return response;
}