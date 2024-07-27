export const createLinkResDto = (link_id) => {
    return `생성된 링크 id: ${link_id}`;
}

export const getLinksResDto = (getResult) => {
    return getResult.map(link=> ({
        id: link.id,
        zip_id: link.zip_id,
        user_id: link.user_id,
        title: link.title,
        url: link.url,
        text: link.text,
        memo: link.memo,
        tag: link.tag,
        alert_date: link.alert_date,
        thumb: link.thumb,
        like: link.like,
        visit: link.visit,
        visit_date: link.visit_date,
        created_at: link.created_at,
        updated_at: link.updated_at,
    }));
}

export const updateVisitResDto = (updateResult) => {
    return {
        link_id: updateResult.id ,
        visit: updateResult.visit,
        visit_date: updateResult.visit_date
    }
}

export const updateLikeResDto = (updateResult) => {
    return {
        link_id: updateResult.id ,
        like: updateResult.like
    }
}

export const updateZipIdResDto = (updateResult) => {
    return {
        link_id: updateResult.id ,
        new_zip_id: updateResult.zip_id
    }
}

export const deleteZipIdResDto = (affectedRows) => {
    return `${affectedRows}개의 링크 데이터를 성공적으로 삭제하였습니다.`
}