import { response } from "@config/response.js";
import { status } from '@config/response.status.js';
import { addUserSer } from '@services/user.service.js';
import { getUserSer } from "@providers/user.provider.js";

/** 회원가입 */
export const addUserCnt = async (req, res, next) => {
    console.log("회원가입 ㅊㅊ", req.body);

    res.send(response(status.SUCCESS, await addUserSer(req.body)));
}

/** 유저 조회 */
export const getUserCnt = async (req, res, next) => {
    console.log("조회할 유저id", req.params);
    
    res.send(response(status.SUCCESS, await getUserSer(req.params)));
}