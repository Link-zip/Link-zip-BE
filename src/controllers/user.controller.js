import { BaseError } from "@config/error";
import { response } from "@config/response.js";
import { status } from '@config/response.status.js';
import { addUserSer, checkNicknameSer } from '@services/user.service.js';
import { getUserSer } from "@providers/user.provider.js";

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

    if (nickname === undefined || nickname === "") {
        throw new BaseError(status.BAD_REQUEST);
    }

    try {
        res.send(response(status.SUCCESS, await checkNicknameSer(nickname)));
    } catch (error) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}