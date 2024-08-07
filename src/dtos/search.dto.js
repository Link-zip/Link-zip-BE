/** 링크 검색 Request Dto */
export const searchLinkReqDto = (req) => {
    return {
        user_id : req.body.user_id,
        keyword : req.query.keyword
    }
}
