/** 링크 검색 Request Dto */
export const searchLinkReqDto = (req) => {
    return {
        user_id : req.userId,
        keyword : req.query.keyword
    }
}

export const searchLinkResDto = (result) => {
    return {
        link : {
          id : result.link_id,
          title : result.link_title,
          url : result.url,
          tag : result.tag,
          thumbnail : result.thumb,
          like : result.like,
          createdAt : result.created_at,
        },
        zip : {
          id : result.zip_id,
          title : result.zip_title,
          color : result.zip_color,
        }
    }
}