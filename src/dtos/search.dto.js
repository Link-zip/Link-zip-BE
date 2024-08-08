/** 링크 검색 Request Dto */
export const searchLinkReqDto = (req) => {
    return {
        user_id : req.userId,
        keyword : req.query.keyword
    }
}
