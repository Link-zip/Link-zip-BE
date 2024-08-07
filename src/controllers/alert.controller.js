// src/routes/alert.controller.js
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { prepareAlertData, alertPreview, checkAlert, eraseAlert } from "../services/alert.service.js";

export const createAlert = async (req,res,next) => {
    console.log("새 알림을 생성합니다.");
    res.send(response(status.SUCCESS, await prepareAlertData(req)));
}

export const userAlert = async (req,res,next) => {
    console.log("알람을 조회합니다.");
    res.send(response(status.SUCCESS, await alertPreview(req)));
}

export const confirmAlert = async (req,res,next) => {
    console.log("알림을 확인합니다.");
    res.send(response(status.SUCCESS, await checkAlert(req.params)));
}

export const deleteAlert = async (req,res,next) => {
    console.log("알림을 삭제합니다.");
    res.send(response(status.SUCCESS, await eraseAlert(req.params)));
}
