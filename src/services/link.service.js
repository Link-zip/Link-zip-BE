import { fetchUrlContent, getUrlThumb, getYoutubeSummary } from "@providers/link.provider";
import { getGptResponse, getGptYoutubeSummary } from "@providers/link.provider";
import { BaseError} from "@config/error";
import { status } from "@config/response.status";
import { addLinkDao, deleteZipIdDao, getLinksDao, updateLikeDao, updateThumbDao, updateVisitDao, updateZipIdDao } from "@models/link.dao";
import { createLinkResDto, deleteZipIdResDto, getLinksResDto, updateLikeResDto, updateVisitResDto, updateZipIdResDto } from "@dtos/link.dto";

/** 사이트 정보 요약 */
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

export const checkYoutube = (url) => {
    if (url.includes('youtube.com/watch?v=') || url.includes('youtu.be/'))
        return true;
}

/** url 요약 정보 생성 */
export const generateUrlSummary = async (url) =>  {
    const isYoutube = checkYoutube(url);
    if(!isYoutube){
        const content = await fetchUrlContent(url);
        if (!content) {
            throw new BaseError(status.NOT_FOUND);    
        }
        const summary = await summarizeContent(content.content, 300);
        const response = await getGptResponse(summary);
        return response;
    } else { // 유튜브 URL인 경우
        const youtubeSummary = await getYoutubeSummary(url);
        const gptResponse = await getGptYoutubeSummary(youtubeSummary);
        const formattedText = `요약을 요청하신 URL이 유튜브 플랫폼 동영상으로 확인되어 영상 내용을 AI로 요약한 결과입니다 : ${gptResponse}`
        return formattedText;
    }
}

export const getLinkSer = async (zipId, userId, tag) => {
    const getResult = await getLinksDao(zipId, userId, tag);
    
    if(getResult == null) {
        return '해당되는 문자열이 없습니다.';
    } else {
        return getLinksResDto(getResult);
    }
}

export const createNewLinkSer = async (body) => {
    const createdLinkId = await addLinkDao(body); 

    // provider를 통해 body.url의 thumb 주소값 가져옴
    const thumb = await getUrlThumb(body.url);
    
    
    if(thumb != null) {
        const affectedRows = await updateThumbDao(createdLinkId, thumb);

        if (affectedRows === 0) {
            throw new BaseError(status.FAILED_TO_UPDATE);
        }
    }

    if(createdLinkId == -1) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } else {
        return createLinkResDto(createdLinkId);
    }
}

export const updateVisitSer = async (linkId) => {
    const updateVisitResult = await updateVisitDao(linkId); 

    if(updateVisitResult == null){
        throw new BaseError(status.FAILED_TO_UPDATE);
    } else {
        return updateVisitResDto(updateVisitResult);
    }
}

export const updateLikeSer = async (linkId) => {
    const updateLikeResult = await updateLikeDao(linkId);
    if(updateLikeResult == null){
        throw new BaseError(status.FAILED_TO_UPDATE);
    } else {
        return updateLikeResDto(updateLikeResult);
    }
}

export const updateZipIdSer = async (linkId, newZipId) => {
    const updateZipIdResult = await updateZipIdDao(linkId, newZipId);
    if(updateZipIdResult == null){
        throw new BaseError(status.FAILED_TO_UPDATE);
    } else {
        return updateZipIdResDto(updateZipIdResult);
    }
}

export const deleteLinkByIdSer = async (linkId) => {
    const affectedRows = await deleteZipIdDao(linkId);
    
    if(affectedRows == null){
        throw new BaseError(status.FAILED_TO_DELETE);
    } else {
        return deleteZipIdResDto(affectedRows);
    }
}