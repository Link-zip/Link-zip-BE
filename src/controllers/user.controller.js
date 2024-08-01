import jwt from 'jsonwebtoken';
import { BaseError } from "@config/error";
import { response } from "@config/response.js";
import { status } from '@config/response.status.js';
import { addUserSer, checkNicknameSer } from '@services/user.service.js';
import { getUserSer, getKakaoUserInfo } from "@providers/user.provider.js";

/** 카카오 로그인 및 jwt 생성 */
export const kakaoLoginCnt = async (req, res, next) => {
    const { authCode } = req.body;

    try {
        const kakaoUserInfo = await getKakaoUserInfo(authCode);
        const payload = {
            kakaoId: kakaoUserInfo.id,
            connectedAt: kakaoUserInfo.connected_at,
        };
        console.log(payload)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token)
        res.send(response(status.SUCCESS, { token }));
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }
    
}

/** 회원가입 */
export const addUserCnt = async (req, res, next) => {
    res.send(response(status.SUCCESS, await addUserSer(req.body)));
}

/** 사용자 조회 컨트롤러 (userId) */
export const getUserCnt = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getUserSer(req.params)));
}

/** 닉네임 중복 체크 컨트롤러 (query: nickname) */
export const checkNicknameCnt = async (req, res, next) => {
    const nickname = req.query.nickname;

    // 요청값(닉네임)이 없는 경우
    if (nickname === undefined || nickname === "") {
        throw new BaseError(status.BAD_REQUEST);
    }

    return res.send(response(status.NICKNAME_VALID, await checkNicknameSer(nickname)));
}