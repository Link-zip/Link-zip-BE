import { fetchUrlContent, getUrlThumb, getUrlTitle, getYoutubeSummary } from "@providers/link.provider";
import { getGptResponse, getGptYoutubeSummary } from "@providers/link.provider";
import { BaseError} from "@config/error";
import { status } from "@config/response.status";
import { addLinkAlertDao, addLinkDao, deleteLinkByIdDao, getLinkByIdDao, getLinksDao, modifyLinkDao, transactionDao, updateLikeDao, updateLinkAlertDateDao, updateThumbDao, updateVisitDao, updateZipIdDao } from "@models/link.dao";
import { createLinkResDto, deleteZipIdResDto, extractUrlResDto, getLinkByIdResDto, getLinksResDto, modifyLinkResDto, updateLikeResDto, updateVisitResDto, updateZipIdResDto } from "@dtos/link.dto";

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

export const extractYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const extractUrlSer = async (url) => {
    const thumb = await getUrlThumb(url);
    const title = await getUrlTitle(url);

    return extractUrlResDto(thumb, title);
}

/** url 요약 정보 생성 */
export const generateUrlSummary = async (url) =>  {
    const isYoutube = checkYoutube(url);
    if(!isYoutube){
        const content = await fetchUrlContent(url);
        if (!content) {
            throw new BaseError(status.FETCH_FAIL);    
        }
        const summary = await summarizeContent(content.content, 300);
        const response = await getGptResponse(summary);
        return { url_summary : response };
    } else { // 유튜브 URL인 경우
        const youtubeSummary = await getYoutubeSummary(url);
        if(!youtubeSummary) {
            throw new BaseError(status.FETCH_FAIL);
        }
        const gptResponse = await getGptYoutubeSummary(youtubeSummary);
        const formattedText = `요약을 요청하신 URL이 유튜브 플랫폼 동영상으로 확인되어 영상 내용을 AI로 요약한 결과입니다 : ${gptResponse}`
        return { url_summary: formattedText };
    }
}

export const getLinksSer = async (zipId, userId, tag, sortOrder) => {
    const getResult = await getLinksDao(zipId, userId, tag, sortOrder);
    
    if(getResult == null) {
        throw BaseError(status.LINK_NOT_FOUND);
    } else {
        return getLinksResDto(getResult);
    }
}

export const getLinkByIdSer = async (linkId) => {
    const getResult = await getLinkByIdDao(linkId);

    if(getResult == null) {
        throw BaseError(status.LINK_NOT_FOUND);
    } else {
        return getLinkByIdResDto(getResult);
    }
}

export const createNewLinkSer = async (userId, body) => {
    return await transactionDao(async (conn) => {
        const createdLinkId = await addLinkDao(conn, userId, body); //링크 생성
        
        /** provider를 통해 body.url의 thumb 주소값 가져옴 */
        const thumb = await getUrlThumb(body.url);
        /** 있으면 생성된 링크 데이터의 thumb필드에 저장 */
        if(thumb != null) {
            const affectedRows = await updateThumbDao(conn, createdLinkId, thumb); // thumb 값 갱신

            if (affectedRows === 0) {
                throw new BaseError(status.FAILED_TO_UPDATE);
            }
        }

        /** 링크 생성 후, alert_date가 존재하면 alert 테이블에 데이터 생성 */
        if (body.alert_date) {
            await addLinkAlertDao(conn, userId, createdLinkId, body.alert_date); // 링크가 성공적으로 생성된 경우 alert 데이터 생성
        }

        /** 생성된 링크가 있는 경우 */
        if(createdLinkId == -1) {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }

        return createLinkResDto(createdLinkId);
    })
}

export const updateVisitSer = async (linkId) => {
    const updateVisitResult = await updateVisitDao(linkId); 

    if(updateVisitResult == null){
        throw new BaseError(status.FAILED_TO_UPDATE);
    } else if(typeof updateVisitResult === 'string') {
        return updateVisitResult;
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

export const modifyLinkSer = async (userId, linkId, body) => {
    const modifyLinkResult = await modifyLinkDao(linkId, body);
    
    if(modifyLinkResult == null) {
        throw new BaseError(status.FAILED_TO_UPDATE);
    }
    // alert_date 값을 입력 받은 경우 alert의 날짜 수정
    if (body.alert_date) {
        const updateLinkAlertResult = await updateLinkAlertDateDao(userId, linkId, body.alert_date);

        if (updateLinkAlertResult.affectedRows === 0) {
            throw new BaseError(status.FAILED_TO_UPDATE);
        }
    }
    
    if(typeof modifyLinkResult === 'string'){ // 수정된 링크 데이터가 없음
        return modifyLinkResult;
    } else {
        return modifyLinkResDto(modifyLinkResult);
    }
}

export const deleteLinkByIdSer = async (linkId) => {
    const affectedRows = await deleteLinkByIdDao(linkId);
    
    if(affectedRows == null){
        throw new BaseError(status.FAILED_TO_DELETE);
    } else {
        return deleteZipIdResDto(affectedRows);
    }
}