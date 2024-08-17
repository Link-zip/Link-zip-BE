// linkscount.controller.js
import { response } from "@config/response.js";
import { status } from "@config/response.status.js";
import {alertCountData, unreadCountData, oldCountData, totalCountData} from "../providers/linkscount.provider.js";

export const countAlert = async (req,res,next) => {
    res.send(response(status.SUCCESS, await alertCountData(req.userId)));
}

export const countUnread = async (req,res,next) => {
    res.send(response(status.SUCCESS, await unreadCountData(req.userId)));
}
export const countOld = async (req,res,next) => {
    res.send(response(status.SUCCESS, await oldCountData(req.userId)));
}
export const countTotal = async (req,res,next) => {
    res.send(response(status.SUCCESS, await totalCountData(req.userId)));
}