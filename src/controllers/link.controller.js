import { response } from "@config/response";
import { status } from "@config/response.status";
import { BaseError } from "@config/error";
import { createNewLinkSer, deleteLinkByIdSer, extractUrlSer, generateUrlSummary, getLinkByIdSer, getLinksSer, modifyLinkSer, updateLikeSer, updateVisitSer, updateZipIdSer } from "@services/link.service";


export const getLinksCnt = async (req, res) => {
    const zip_id = req.params.zip_id;
    const user_id = req.userId;
    const { tag, sortOrder } = req.query;
    
    try {
        res.send(response(status.SUCCESS, await getLinksSer(zip_id, user_id, tag, sortOrder)));
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

export const getSummaryCnt = async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return BaseError(status.BAD_REQUEST);
    }

    try {
        const AIResponse = await generateUrlSummary(url);
        res.send(response(status.SUCCESS, AIResponse ));
    } catch (err) {
        return BaseError(status.FETCH_FAIL);
    }
}

export const extractUrlCnt = async (req, res) => {
    const url = req.body.url;

    if (!url) {
        return BaseError(status.BAD_REQUEST);
    }

    try {
        const extractResponse = await extractUrlSer(url);
        res.send(response(status.SUCCESS, extractResponse));
    } catch (err){
        return BaseError(status.FETCH_FAIL);
    }

}

export const createNewLinkCnt = async (req, res) => {
    // text 정보를 받아온 경우 tag: text 로 아니면 link로 저장
    try {
        res.send(response(status.CREATED, await createNewLinkSer(req.userId, req.body)));
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

export const modifyLinkCnt = async (req, res) => {
    try {
        const {link_id} = req.params;
        res.send(response(status.SUCCESS, await modifyLinkSer(req.userId, link_id, req.body)));
    } catch (err) {
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