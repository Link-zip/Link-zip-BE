import { status } from "@config/response.status";
import { BaseError } from "@config/error";
import { userResponseDTO } from "@dtos/user.dto";
import { getUserDao } from "@models/user.dao";
import axios from "axios";

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

        console.log("kakao access token:", accessToken);
        const userInfoResponse = await axios.get(
            `https://kapi.kakao.com/v2/user/me`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log(userInfoResponse.data);
        return userInfoResponse.data;
    } catch (error) {
        throw new BaseError(status.KAKAO_TOKEN_ERROR);
    }
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