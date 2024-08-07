import { response } from '@config/response.js';
import { status } from '@config/response.status.js';
import { searchLinkReqDto } from '@dtos/search.dto';
import { searchLinkProvider } from '@providers/search.provider';

// GET API
/** 링크 검색 Controller */
export const searchLinkController = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await searchLinkProvider(searchLinkReqDto(req))));
}