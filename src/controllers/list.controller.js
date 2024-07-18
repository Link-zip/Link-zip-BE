// src/routes/list.controller.js
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { getUnviewList } from "../providers/list.provider.js";

export const viewUnviewList = async (req,res,next) => {//미열람 링크 리스트 조회
    console.log("미열람 링크 리스트를 출력합니다. ");
    res.send(response(status.SUCCESS, await getUnviewList(req.params, req.query)));
}