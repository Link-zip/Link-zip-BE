import jwt from 'jsonwebtoken';
import { status } from "@config/response.status";
import { BaseError } from "@config/error";
import { userTokenResponseDTO, userResponseDTO } from '@dtos/user.dto.js';
import { addUserDao, getUserDao, checkNicknameDao, getUserByKakaoIdDao } from '@models/user.dao.js';
import { generateKeyFromKakaoId } from "@providers/user.provider";

/** 사용자 회원가입 서비스 */
export const addUserSer = async (body) => {
    let kakaoId;
    let joinUserId;

    if (userKeyCache.has(body.key)) {
        kakaoId = userKeyCache.get(body.key);
        userKeyCache.delete(body.key); // 캐싱된 key 삭제

        // id 리턴
        joinUserId = await addUserDao({
            "key": body.key,
            "kakaoId": kakaoId,
            "nickname": body.nickname,
        });
    } else {
        throw new BaseError(status.INVALID_KEY);
    }

    return userResponseDTO(await getUserDao(joinUserId));
};

/** 닉네임 중복 여부: 서비스 단에서 분기 처리 */
export const checkNicknameSer = async (nickname) => {
    const result = await checkNicknameDao(nickname);

    if (result.count > 0) {
        return false;
    }
    return true;
}

/** 기존 유저 여부 검증: 서비스 단에서 분기 처리 */
export const getUserByKakaoId = async (kakaoId) => {
    const result = await getUserByKakaoIdDao(kakaoId);

    if (result === undefined) { // 신규 유저
        const key = generateKeyFromKakaoId(kakaoId);
        userKeyCache.set(key, kakaoId); // 카카오 id - key값 캐싱
        return {
            "isExists": false,
            "key": key,
        };
    }

    return {
        "isExists": true,
        "userId": result.id,
        "nickname": result.nickname,
    };
}

/** 사용자 정보 조회 서비스 */
export const getUserSer = async (userId) => {
    const result = await getUserDao(userId);

    if (result === undefined) {
        throw new BaseError(status.USER_NOT_FOUND);
    }

    return userResponseDTO(result);
}

/** 토큰 생성 */
export const generateToken = async (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    const expiresIn = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    return userTokenResponseDTO(token, expiresIn);
}