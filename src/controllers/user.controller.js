import { BaseError } from "@config/error";
import { response } from "@config/response.js";
import { status } from '@config/response.status.js';
import { addUserSer, getUserSer, checkNicknameSer, getUserByKakaoId, generateToken, patchUserInfoSer, deleteUserSer } from '@services/user.service.js';
import { getKakaoUserInfo, setRefreshTokenCache, refreshKakaoToken, deleteRefreshTokenCache, getRefreshTokenCache } from "@providers/user.provider.js";
import { refresh } from "src/utils/jwt.util";

/** 카카오 로그인 및 jwt 생성 */
export const kakaoLoginCnt = async (req, res, next) => {
    const { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt } = req.body;
    const kakaoUserInfo = await getKakaoUserInfo(accessToken);

    /** TODO : 카카오 토큰 갱신 로직 */
    // try {
    //     kakaoUserInfo = await getKakaoUserInfo(accessToken); // 카카오 토큰으로 카카오 유저 정보 조회
    //     console.log(kakaoUserInfo);
    // } catch (error) {
    //     if (error.response.status === 401) {
    //         try {
    //             const kakaoTokenResponse = await refreshKakaoToken(refreshToken);
    //             kakaoUserInfo = await getKakaoUserInfo(kakaoTokenResponse.access_token);
    //         } catch (error) {
    //             throw new BaseError(status.KAKAO_TOKEN_ERROR);
    //         }
    //     }
    // }

    try {
        const result = await getUserByKakaoId(kakaoUserInfo.id);

        if (result.isExists) { // 기존 유저임
            const payload = {
                userId: result.userId,
                nickname: result.nickname,
                kakaoId: kakaoUserInfo.id,
            };
            const tokenResponse = await generateToken(payload);

            // 기존 refreshToken이 존재하면 삭제
            if (await getRefreshTokenCache(result.userId)) {
                await deleteRefreshTokenCache(result.userId);
            }
            await setRefreshTokenCache(result.userId, tokenResponse.refreshToken);

            return res.send(response(status.SUCCESS, {isExists: true, tokenResponse: tokenResponse}));
        } else {
            return res.send(response(status.SUCCESS, result));
        }
    } catch (error) {
        throw new BaseError(status.SERVER_TOKEN_ERROR); // jwt 발급 실패시
    }
}

/** 회원가입 */
export const addUserCnt = async (req, res, next) => {
    const result = await addUserSer(req.body); // 회원가입 리턴값
    const payload = {
        userId: result.userId,
        nickname: result.nickname,
        kakaoId: result.kakaoId,
    };

    try {
        const tokenResponse = await generateToken(payload);
        await setRefreshTokenCache(result.userId, tokenResponse.refreshToken); // redis 저장
        return res.send(response(status.SUCCESS, tokenResponse));
    } catch (error) {
        throw new BaseError(status.SERVER_TOKEN_ERROR); // jwt 발급 실패시
    }
}

/** 사용자 조회 컨트롤러 (userId) */
export const getUserCnt = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await getUserSer(req.userId)));
}

/** 닉네임 중복 체크 컨트롤러 (query: nickname) */
export const checkNicknameCnt = async (req, res, next) => {
    const nickname = req.query.nickname;

    // 요청값(닉네임)이 없는 경우
    if (nickname === undefined || nickname === "") {
        throw new BaseError(status.BAD_REQUEST);
    }

    return res.send(response(status.SUCCESS, await checkNicknameSer(nickname)));
}

/** 사용자 정보 수정 컨트롤러 (userId, nickname) */
export const patchUserInfoCnt = async (req, res, next) => {
    const userId = req.userId;
    const nickname = req.body.nickname;

    const userInfo = await getUserSer(userId);
    const prevNickname = userInfo.nickname; // 기존 닉네임

    // 요청값(닉네임)이 없는 경우, 기존 닉네임과 동일한 경우 에러처리
    if (nickname === undefined || nickname === "") {
        throw new BaseError(status.BAD_REQUEST);
    } else if (nickname === prevNickname) {
        throw new BaseError(status.USER_NICKNAME_SAME);
    }

    const result = await patchUserInfoSer(userId, nickname);
    return res.send(response(status.SUCCESS, result));
}

/** 토큰 갱신 컨트롤러 */
export const refreshTokenCnt = async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        throw new BaseError(status.TOKEN_INVALID);
    }

    const tokenResponse = await refresh(refreshToken);
    return res.send(response(status.SUCCESS, tokenResponse));
}

/** 테스트 토큰 발급 */
export const getTestTokenCnt = async (req, res, next) => {
    const result = await getUserSer(99);

    const payload = {
        userId: result.userId,
        nickname: result.nickname,
        kakaoId: result.kakaoId,
    };

    try {
        const tokenResponse = await generateToken(payload);
        
        // 기존 refreshToken이 존재하면 삭제
        if (await getRefreshTokenCache(result.userId)) {
            await deleteRefreshTokenCache(result.userId);
        }
        await setRefreshTokenCache(result.userId, tokenResponse.refreshToken);
        
        return res.send(response(status.SUCCESS, tokenResponse));
    } catch (error) {
        throw new BaseError(status.SERVER_TOKEN_ERROR); // jwt 발급 실패시
    }
}

export const deleteUserCnt = async (req, res, next) => {
    const result = await deleteUserSer(req.userId);
    return res.send(response(status.SUCCESS, result));
}