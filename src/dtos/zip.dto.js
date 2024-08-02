
// POST API DTO
export const createZipReqDto = (body) => {
    return {
        user_id : body.user_id,
        title : body.title,
        color : body.color,
    };
};

export const createZipResDto = (zip_id) => {
    return {
        message : `${zip_id} zip이 생성되었습니다.`
    };
};

// DELETE API DTO
export const deleteZipReqDto = (body) => {
    return {
        user_id : body.user_id,
        zip_id : body.id,
        status : body.status
    };
};

export const deleteZipResDto = (reqDto) => {
    return {
        message : `${reqDto.user_id}의 ${reqDto.zip_id} zip이 삭제되었습니다.`
    };
};

// GET API DTO
export const getZipResDto = (zip) => {
    return {
        user_id : zip.user_id,
        zip_id : zip.id,
        title : zip.title,
        color : zip.color,
        link_count : zip.link_count
    };
}

// PATCH API DTO
export const editZipReqDto = (body) => {
    return {
        user_id : body.user_id,
        zip_id : body.id,
        title : body.title,
        color : body.color
    };
}

export const editZipResDto = (zip_id) => {
    return {
        message : `${zip_id} zip이 수정 되었습니다.`
    };
}