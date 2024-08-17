export const getAllNoticeResDto = (getResult) =>{
    return {
        notice_data: getResult.map(({id, title, content, created_at, updated_at}) => ({
            id,
            title,
            content,
            created_at,
            updated_at
        }))
    }
}

export const getNoticeByIdResDto = (getResult) =>{
    const {id, title, content, created_at, updated_at} = getResult;
    return { 
        id, 
        title, 
        content, 
        created_at, 
        updated_at }
}

export const createNoticeResDto = (notice_id) =>{
    return {
        notice_id
    }
}

export const deleteNoticeResDto = (affectedRows) =>{
    return `${affectedRows}개의 공지사항 데이터를 성공적으로 삭제하였습니다.`
}