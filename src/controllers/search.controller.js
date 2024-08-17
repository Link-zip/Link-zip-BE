import { response } from '@config/response.js';
import { status } from '@config/response.status.js';
import { BaseError } from '@config/error';
import { searchLinkReqDto } from '@dtos/search.dto';
import { searchLinkProvider } from '@providers/search.provider';
import { updateSearchLogService, deleteLogByKeywordService } from '@services/search.services';

// GET API
/** 링크 검색 Controller */
export const searchLinkController = async (req, res, next) => {
    const searchResult = await searchLinkProvider(searchLinkReqDto(req));

    let searchLogs = [];
    if(req.cookies.searchLogs){
        searchLogs = req.cookies.searchLogs;
    }
    searchLogs = await updateSearchLogService(req.query.keyword, searchLogs);
    res.cookie("searchLogs", searchLogs, {httpOnly : true, path : "/search"});

    return res.send(response(status.SUCCESS, searchResult));
}

/** 검색 기록 가져오기 Controller */
export const getSearchLogController = async (req, res, next) => {
    let searchLogs = [];
    if(req.cookies.searchLogs){
        searchLogs = req.cookies.searchLogs;
    }
    if(searchLogs.length == 0) {
        throw new BaseError(status.SEARCHLOG_NOT_FOUND);
    }

    const result = {
        searchLogs : searchLogs
    }
    return res.send(response(status.SUCCESS, result));
}

/** 특정 검색 기록 삭제하기 Controller */
export const deleteLogByKeywordController = async (req, res, next) => {
    let searchLogs = [];
    if(req.cookies.searchLogs){
        searchLogs = req.cookies.searchLogs;
    }
    if(searchLogs.length == 0) {
        throw new BaseError(status.SEARCHLOG_NOT_FOUND);
    }

    searchLogs = await deleteLogByKeywordService(req.query.keyword, searchLogs);

    res.cookie("searchLogs", searchLogs, {httpOnly : true, path : "/search"});
    return res.send(response(status.DELETED, {message : "해당 검색기록이 삭제되었습니다."}));
}

/** 모든 검색기록 삭제하기 */
export const deleteAllSearchLogsController = async (req, res, next) => {
    let searchLogs = [];
    res.cookie("searchLogs", searchLogs, {httpOnly : true, path : "/search"});
    return res.send(response(status.DELETED, {message : "모든 검색기록이 삭제되었습니다."}));
}