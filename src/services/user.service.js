import jwt from 'jsonwebtoken';
import { status } from "@config/response.status";
import { BaseError } from "@config/error";
import { userTokenResponseDTO, userResponseDTO, userUpdateDTO, checkNicknameDTO } from '@dtos/user.dto.js';
import { addUserDao, getUserDao, checkNicknameDao, getUserByKakaoIdDao, patchUserInfoDao } from '@models/user.dao.js';
import { generateKeyFromKakaoId } from "@providers/user.provider";

/** 사용자 회원가입 서비스 */
export const addUserSer = async (body) => {
    let kakaoId = await getUserKeyCache(body.key);
    let joinUserId;

    if (kakaoId) {
        await deleteUserKeyCache(body.key);

        // id 리턴
        joinUserId = await addUserDao({
            "kakaoId": kakaoId,
            "nickname": body.nickname,
        });
    } else {
        throw new BaseError(status.INVALID_KEY);
    }

    return userResponseDTO(await getUserDao(joinUserId));
};

/** 닉네임 중복 여부: 서비스 레이어에서 분기 처리 */
export const checkNicknameSer = async (nickname) => {
    const result = await checkNicknameDao(nickname);

    if (result.count > 0) {
        return checkNicknameDTO(false); // 중복 O
    }
    return checkNicknameDTO(true); // 중복 X
}

/** 사용자 정보 수정 */
export const patchUserInfoSer = async (userId, nickname) => {
    const result = await patchUserInfoDao(userId, nickname);

    if (result === 1) {
        return userUpdateDTO(await getUserDao(userId)); // 수정된 사용자 정보 반환
    } else {
        throw new BaseError(status.USER_NOT_FOUND);
    }
}

/** 기존 유저 여부 검증: 서비스 레이어에서 분기 처리 */
export const getUserByKakaoId = async (kakaoId) => {
    const result = await getUserByKakaoIdDao(kakaoId);

    if (result === undefined) { // 신규 유저
        const key = await generateKeyFromKakaoId(kakaoId);
        await setUserKeyCache(key, kakaoId);
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
    const access = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refresh = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    const accessExpiresIn = new Date(Date.now() + 60 * 60 * 1000);
    const refreshExpiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    return userTokenResponseDTO(access, accessExpiresIn, refresh, refreshExpiresIn);
}