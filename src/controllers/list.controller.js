// src/routes/list.controller.js
import { response } from "@config/response.js";
import { status } from "@config/response.status.js";

import { getUnviewList, getLikeList, getRecentList } from "../providers/list.provider.js";

export const viewUnviewList = async (req,res,next) => {//미열람 링크 리스트 조회
    res.send(response(status.SUCCESS, await getUnviewList(req.params, req.query)));
}

export const viewLikeList = async(req,res)=>{
    res.send(response(status.SUCCESS, await getLikeList(req.params, req.query)))
}

export const viewRecentList = async(req,res)=>{
    res.send(response(status.SUCCESS, await getRecentList(req.params, req.query)))
}