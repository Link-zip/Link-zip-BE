import { status } from "@config/response.status";
import { BaseError } from "@config/error";
import { userResponseDTO } from '@dtos/user.dto.js';
import { addUserDao, getUserDao, checkNicknameDao, getUserByKakaoIdDao } from '@models/user.dao.js';
import { generateKeyFromKakaoId } from "@providers/user.provider";

/** 사용자 회원가입 서비스 */
export const addUserSer = async (body) => {
    let kakaoId;

    if (userKeyCache.has(body.key)) {
        kakaoId = userKeyCache.get(body.key);
        userKeyCache.delete(body.key); // 캐싱된 key 삭제

        // id 리턴
        const joinUserId = await addUserDao({
            "key": body.key,
            "kakaoId": kakaoId,
            "nickname": body.nickname,
        });

        return userResponseDTO(await getUserDao(joinUserId));
    } else {
        throw new BaseError(status.INVALID_KEY);
    }
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

/** 기존 유저 여부 검증: 서비스 단에서 분기 처리 */
export const getUserByKakaoId = async (kakaoId) => {
    const result = await getUserByKakaoIdDao(kakaoId);

    if (result === undefined) {
        const key = generateKeyFromKakaoId(kakaoId);
        userKeyCache.set(key, kakaoId); // 카카오 id - key값 캐싱
        console.log(userKeyCache);
        throw new BaseError(status.USER_NOT_FOUND, key); // 404 에러
    }

    return userResponseDTO(result);
}

/** 사용자 정보 조회 서비스 */
export const getUserSer = async (req) => {
    const userId = req.userId;
    const result = await getUserDao(userId);

    if (result === undefined) {
        throw new BaseError(status.USER_NOT_FOUND);
    }

    return userResponseDTO(result);
}