/** userId, 닉네임, kakaoId, 생성일 반환 DTO */
export const userResponseDTO = (data) => {
    return {
        userId: data.id,
        nickname: data.nickname,
        kakaoId: data.kakao_id,
        createdAt: data.created_at,
    }
}

/** userId, 닉네임, 수정일 반환 DTO */
export const userUpdateDTO = (data) => {
    return {
        userId: data.id,
        nickname: data.nickname,
        updatedAt: data.updated_at,
    }
}

/** 토큰 반환 DTO */
export const userTokenResponseDTO = (access, accessExpiresIn, refresh, refreshExpiresIn) => {
    return {
        accessToken: access,
        accessTokenExpiresIn: accessExpiresIn,
        refreshToken: refresh,
        refreshTokenExpiresIn: refreshExpiresIn,
    }
}

export const userAccessTokenResponseDTO = (access, accessExpiresIn) => {
    return {
        accessToken: access,
        accessTokenExpiresIn: accessExpiresIn,
    }
}

/** 닉네임 중복 여부 반환 DTO */
export const checkNicknameDTO = (isValid) => {
    return {
        isValid: isValid,
    }
}