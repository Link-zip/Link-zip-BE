import axios from "axios";
import CryptoJS from "crypto-js";
import { status } from "@config/response.status";
import { BaseError } from "@config/error";
import { redisClient } from "@config/redis";

/** 카카오 토큰 발급 */
export const getKakaoToken = async (authCode) => {
    try {
        const tokenResponse = await axios.post(
            `https://kauth.kakao.com/oauth/token`, null,
            {
                params: {
                    grant_type: "authorization_code",
                    client_id: process.env.KAKAO_CLIENT_ID,
                    redirect_uri: process.env.KAKAO_REDIRECT_URI,
                    code: authCode,
                },
            }
        );

        const accessToken = tokenResponse.data.access_token; // 카카오 accessToken

        const userInfoResponse = await axios.get(
            `https://kapi.kakao.com/v2/user/me`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return userInfoResponse.data;
    } catch (error) {
        throw new BaseError(status.KAKAO_TOKEN_ERROR);
    }
}

/** 카카오 토큰으로 유저 정보 추출 */
export const getKakaoUserInfo = async (kakaoToken) => {
    try {
        const userInfoResponse = await axios.get(
            `https://kapi.kakao.com/v2/user/me`,
            {
                headers: {
                    Authorization: `Bearer ${kakaoToken}`,
                },
            }
        );
        return userInfoResponse.data;
    } catch (error) {
        throw new BaseError(status.KAKAO_TOKEN_ERROR);
    }
}

/** 카카오id로 회원가입 key 생성 */
export const generateKeyFromKakaoId = async (kakaoId) => {
    const hash = CryptoJS.SHA256(kakaoId).toString();
    return hash;
}

/** redis 회원가입 key 저장 */
export const setUserKeyCache = async (key, kakaoId) => {
    await redisClient.set(key, kakaoId, 'EX', 60 * 60 * 24); // 24시간 캐싱
}

/** redis 회원가입 key 조회 */
export const getUserKeyCache = async (key) => {
    const kakaoId = await redisClient.get(key);
    console.log('kakaoId: ', kakaoId);
    return kakaoId;
}

/** redis 회원가입 key 삭제 */
export const deleteUserKeyCache = async (key) => {
    await redisClient.del(key);
}