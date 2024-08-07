/** userId, 닉네임, 생성일 반환 DTO */
export const userResponseDTO = (data) => {
    return {
        userId: data.id,
        nickname: data.nickname,
        kakaoId: data.kakao_id,
        createdAt: data.created_at,
    }
}