import { response } from "@config/response";
import { status } from "@config/response.status";
import { BaseError } from "@config/error";
import { createNewNoticeSer, deleteNoitceByIdSer, getAllNoticeSer, getNoticeByIdSer } from "@services/notice.service"

export const getAllNoticeCnt = async (req,res) => {
    try {
        res.send(response(status.SUCCESS, await getAllNoticeSer()));
    } catch(err) {
        console.log('getAllNotice Controller Err:', err);
        return BaseError(status.BAD_REQUEST);
    }
}

export const getNoticeByIdCnt = async (req,res) => {
    try {
        res.send(response(status.SUCCESS, await getNoticeByIdSer(req.params.notice_id)));
    } catch(err) {
        console.log('getNoticeById Controller Err:', err);
        return BaseError(status.BAD_REQUEST);
    }
}

export const createNewNoticeCnt = async (req,res) => {
    try {
        res.send(response(status.SUCCESS, await createNewNoticeSer(req.body)));
    } catch(err) {
        console.log('createNewNotice Controller Err:', err);
        return BaseError(status.BAD_REQUEST);
    }
}

export const deleteNoticeByIdCnt = async (req,res) => {
    try {
        res.send(response(status.SUCCESS, await deleteNoitceByIdSer(req.params.notice_id)));
    } catch(err) {
        console.log('deleteNoticeById Controller Err:', err);
        return BaseError(status.BAD_REQUEST);
    }
}