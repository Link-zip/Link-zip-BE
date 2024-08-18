export const createLinkResDto = (linkId) => {
    return {
        created_link_id: linkId,
        message: `링크가 성공적으로 생성되었습니다. 생성된 링크 id는 ${linkId} 입니다.`
    };
}

export const extractUrlResDto = (thumb, title) => {
    return {
        thumb,
        title
    }
}

export const getLinksResDto = (getResult) => {
    return {
        link_data: getResult.map(({ id, zip_id, user_id, title, url, text, memo, tag, alert_date, thumb, like, visit, visit_date, created_at, updated_at, zip_title, zip_color }) => ({
            id,
            zip_id,
            user_id,
            title,
            url,
            text,
            memo,
            tag,
            alert_date,
            thumb,
            like,
            visit,
            visit_date,
            created_at,
            updated_at,
            zip_color,
            zip_title
        }))
    };
}


export const getLinkByIdResDto = ({id, url, zip_id, user_id, title, memo, text, thumb, tag, alert_date,created_at, updated_at, like, visit, visit_date, zip_color, zip_title}) => {
    return {
        id,
        zip_id,
        user_id,
        url,
        title,
        tag,
        thumb,
        memo,
        text,
        alert_date,
        visit_date,
        created_at,
        updated_at,
        like,
        visit,
        zip_color,
        zip_title
    }
}

export const updateVisitResDto = (updateResult) => {
    return {
        link_id: updateResult.id ,
        visit: updateResult.visit,
        visit_date: updateResult.visit_date,
        message: `방문수 및 최근방문날짜가 업데이트 되었습니다.`
    }
}

export const updateLikeResDto = (updateResult) => {
    return {
        link_id: updateResult.id ,
        like: updateResult.like,
        message: `좋아요가 업데이트 되었습니다.`
    }
}

export const updateZipIdResDto = (updateResult) => {
    return {
        link_id: updateResult.id ,
        new_zip_id: updateResult.zip_id,
        message: `zip이동을 완료하였습니다. 새로 이동한 zip id는 ${updateResult.zip_id}입니다.`
    }
}

export const modifyLinkResDto = ({id, title, text, memo, alert_date}) => {
    return {
        title, 
        text, 
        memo, 
        alert_date,
        message: `${id}번 링크 내용을 성공적으로 수정하였습니다.`
    }
}

export const deleteZipIdResDto = (affectedRows) => {
    return {
        affectedRows,
        message: `${affectedRows}개의 링크 데이터를 성공적으로 삭제하였습니다.`
    }
}