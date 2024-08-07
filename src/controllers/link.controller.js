import { response } from "@config/response";
import { status } from "@config/response.status";
import { BaseError } from "@config/error";
import { createNewLinkSer, deleteLinkByIdSer, generateUrlSummary, getLinkByIdSer, getLinksSer, updateLikeSer, updateVisitSer, updateZipIdSer } from "@services/link.service";


export const getLinksCnt = async  (req, res) => {
    const zip_id = req.params.zip_id;
    const user_id = req.params.user_id; // 추후 토큰에서 가져오는 방법으로 변경
    const tag = req.query.tag;
    
    try {
        res.send(response(status.SUCCESS, await getLinksSer(zip_id, user_id, tag)));
    } catch (err) {
        return BaseError(status.INTERNAL_SERVER_ERROR)
    }
}

export const getLinkByIdCnt = async (req, res) => {
    const link_id = req.params.link_id;

    try{
        res.send(response(status.SUCCESS, await getLinkByIdSer(link_id)))
    } catch (err) {
        return BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const getSummaryCnt = async (req,res) => {
    const url = req.body.url;

    if (!url) { // 에러 메시지 추후 수정
        return BaseError(status.BAD_REQUEST);
    }

    try {
        const AIResponse = await generateUrlSummary(url);
        res.send(response(status.SUCCESS, AIResponse ));
    } catch (err) {
        return BaseError(status.FETCH_FAIL);
    }
}

export const createNewLinkCnt = async (req, res) => {
    // text 정보를 받아온 경우 tag: text 로 아니면 link로 저장
    try {
        res.send(response(status.CREATED, await createNewLinkSer(req.body)));
    } catch (err) {
        return BaseError(status.FAILED_TO_CREATE);
    }
}

export const updateVisitCnt = async (req, res) => {
    // link id 받아와서 visit 정보를 +1 & visit_date에 visit 당시 시간정보를 저장
    try {
        res.send(response(status.SUCCESS, await updateVisitSer(req.params.link_id)))
    } catch (err){
        return BaseError(status.FAILED_TO_UPDATE);
    }
}

export const updateLikeCnt = async (req, res) => {
    try {
        res.send(response(status.SUCCESS, await updateLikeSer(req.params.link_id)))
    } catch (err){
        return BaseError(status.FAILED_TO_UPDATE);
    }
}
/** 링크의 Zip 이동 */
export const updateZipIdCnt = async (req, res) => {
    try {
        const {link_id, new_zip_id} = req.params;
        res.send(response(status.SUCCESS, await updateZipIdSer(link_id, new_zip_id)));
    } catch (err){
        return BaseError(status.FAILED_TO_UPDATE);
    }
}


export const deleteLinkByIdCnt = async (req, res) => {
    try {
        res.send(response(status.SUCCESS, await deleteLinkByIdSer(req.params.link_id)))
    } catch (err){
        return BaseError(status.FAILED_TO_DELETE);
    }
}