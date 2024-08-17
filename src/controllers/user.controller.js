import jwt from 'jsonwebtoken';
import { BaseError } from "@config/error";
import { response } from "@config/response.js";
import { status } from '@config/response.status.js';
import { addUserSer, getUserSer, checkNicknameSer, getUserByKakaoId, generateToken } from '@services/user.service.js';
import { getKakaoUserInfo } from "@providers/user.provider.js";
import { userLoginResponseDTO } from '@dtos/user.dto';

/** 카카오 로그인 및 jwt 생성 */
export const kakaoLoginCnt = async (req, res, next) => {
    const { accessToken, accessTokenExpires, refreshToken, refreshTokenExpires } = req.body;
    const kakaoUserInfo = await getKakaoUserInfo(accessToken);

    /** TODO : 카카오 토큰 갱신 로직 */
    // try {
    //     kakaoUserInfo = await getKakaoUserInfo(accessToken); // 카카오 토큰으로 카카오 유저 정보 조회
    //     console.log(kakaoUserInfo);
    // } catch (error) {
    //     if (error.response.status === 401) {
    //         try {
    //             const newTokens = await refreshKakaoToken(refreshToken);
    //             kakaoUserInfo = await getKakaoUserInfo(newTokens.accessToken);
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
                connectedAt: kakaoUserInfo.connected_at,
            };
            const tokenResponse = await generateToken(payload);
            res.send(response(status.SUCCESS, {isExists: true, tokenResponse: tokenResponse}));
        } else {
            res.send(response(status.SUCCESS, result));
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
        connectedAt: result.createdAt,
    };

    try {
        const tokenResponse = await generateToken(payload); // 지금은 일단 accessToken만 발급
        res.send(response(status.SUCCESS, tokenResponse));
    } catch (error) {
        throw new BaseError(status.SERVER_TOKEN_ERROR); // jwt 발급 실패시
    }
}

/** 사용자 조회 컨트롤러 (userId) */
export const getUserCnt = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getUserSer(req.userId)));
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

/** 테스트 토큰 발급 */
export const getTestTokenCnt = async (req, res, next) => {
    const result = await getUserSer(99);

    const payload = {
        userId: result.userId,
        nickname: result.nickname,
        kakaoId: result.kakaoId,
        connectedAt: result.createdAt,
    };

    try {
        const tokenResponse = await generateToken(payload);
        res.send(response(status.SUCCESS, tokenResponse));
    } catch (error) {
        throw new BaseError(status.SERVER_TOKEN_ERROR); // jwt 발급 실패시
    }
}