import { BaseError } from "@config/error";
import { status } from "@config/response.status";
import { searchLinkResDto } from "@dtos/search.dto";
import { searchLinkDao } from "@models/search.dao";

// GET API
/** 링크 검색 Provider */
export const searchLinkProvider = async (reqDto) => {
    if(!(await reqDto.keyword.trim())){
        throw new BaseError(status.INVALID_KEYWORD);
    }
    const searchResult = {
        links : ((await searchLinkDao(reqDto.user_id, reqDto.keyword)).map((result) => searchLinkResDto(result)))
    };
    if(!searchResult.links.length){
        throw new BaseError(status.SEARCH_NOT_FOUND);
    }
    return searchResult;
}