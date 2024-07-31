/** userId, 닉네임, 생성일 반환 DTO */
export const userResponseDTO = (data) => {
    return {
        userId: data.id,
        nickname: data.nickname,
        createdAt: data.createdAt,
    }
}

/** 닉네임 중복 여부 반환 DTO */
export const nicknameResponseDTO = (data) => {
    return {
        isValid: data.count === 0,
        message: data.count === 0 ? "환상적인 닉네임이에요!" : "이미 사용 중인 유저가 있어요!",
    }
}