import { status } from "@config/response.status";
import { BaseError } from "@config/error";
import { userResponseDTO } from '@dtos/user.dto.js';
import { addUserDao, getUserDao, checkNicknameDao } from '@models/user.dao.js';

/** 사용자 회원가입 서비스 */
export const addUserSer = async (body) => {
    const kakaoId = 1234567890;
    
    // id 리턴
    const joinUserId = await addUserDao({
        "key": body.key,
        "kakaoId": kakaoId,
        "nickname": body.nickname,
    });
    return userResponseDTO(await getUserDao(joinUserId));
};

/** 닉네임 중복 여부: 서비스 단에서 분기 처리 */
export const checkNicknameSer = async (nickname) => {
    const result = await checkNicknameDao(nickname);
    // 닉네임 중복 시 throw
    if (result.count > 0) {
        throw new BaseError(status.NICKNAME_DUPLICATED);
    }
    return true;
}

/** 사용자 정보 조회 서비스 */
export const getUserSer = async (req) => {
    const userId = req.userId;
    const result = await getUserDao(userId);

    if (result === undefined) {
        throw new BaseError(status.USER_NOT_FOUND);
    }

    return userResponseDTO(await getUserDao(userId));
}