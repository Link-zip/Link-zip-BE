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