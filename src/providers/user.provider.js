import axios from "axios";
import CryptoJS from "crypto-js";
import { status } from "@config/response.status";
import { BaseError } from "@config/error";

/** 카카오 토큰 발급 */
export const getKakaoUserInfo = async (authCode) => {
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

export const generateKeyFromKakaoId = (kakaoId) => {
    const hash = CryptoJS.SHA256(kakaoId).toString();
    return hash;
}