import { BaseError} from "@config/error";
import { status } from "@config/response.status";
import { addNoticeDao, deleteNoticeDao, getAllNoticeDao, getNoticeByIdDao } from "@models/notice.dao";
import { deleteNoticeResDto, getAllNoticeResDto, createNoticeResDto, getNoticeByIdResDto } from "@dtos/notice.dto";

export const getAllNoticeSer = async () => {
    const getResult = await getAllNoticeDao();

    if(getResult == null) {
        console.log('공지사항이 없습니다.');
        return null;
    } else {
        return getAllNoticeResDto(getResult);
    }
}

export const getNoticeByIdSer = async (noticeId) => {
    const getResult = await getNoticeByIdDao(noticeId);

    if(getResult == null) {
        console.log('공지사항이 없습니다.');
        return null;
    } else {
        return getNoticeByIdResDto(getResult);
    }
}

export const createNewNoticeSer = async (body) => {
    const createdNoticeId = await addNoticeDao(body);

    if(createdNoticeId == -1) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } else {
        return createNoticeResDto(createdNoticeId);
    }
}

export const deleteNoitceByIdSer = async (noticeId) => {
    const affectedRows = await deleteNoticeDao(noticeId);

    if(affectedRows == null) {
        throw new BaseError(status.FAILED_TO_DELETE);
    } else {
        return deleteNoticeResDto(affectedRows);
    }
}
