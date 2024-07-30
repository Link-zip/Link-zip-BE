import { response } from "@config/response.js";
import { status } from '@config/response.status.js';
import { addUserSer } from '@services/user.service.js';
import { getUserSer, checkNicknameSer } from "@providers/user.provider.js";

/** 회원가입 */
export const addUserCnt = async (req, res, next) => {
    res.send(response(status.SUCCESS, await addUserSer(req.body)));
}

/** 사용자 조회 컨트롤러 (userId) */
export const getUserCnt = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getUserSer(req.params)));
}

export const checkNicknameCnt = async (req, res, next) => {
    const { nickname } = req.query;
    console.log(nickname)
    res.send(response(status.SUCCESS, await checkNicknameSer(nickname)));
}