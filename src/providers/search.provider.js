import { BaseError } from "@config/error";
import { status } from "@config/response.status";
import { getLinksResDto } from "@dtos/link.dto";
import { searchLinkDao } from "@models/search.dao";

// GET API
/** 링크 검색 Provider */
export const searchLinkProvider = async(reqDto) => {
    if(!reqDto.keyword.trim()){
        throw new BaseError(status.BAD_REQUEST);
    }
    const result = getLinksResDto(await searchLinkDao(reqDto.user_id, reqDto.keyword));
    if(!result.length){
        return {
            message : "검색어에 해당하는 링크가 없어요"
        }
    }
    return result;
}