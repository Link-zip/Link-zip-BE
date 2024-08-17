// src/routes/alert.controller.js
import { response } from "@config/response.js";
import { status } from "@config/response.status.js";

import { prepareAlertData, alertPreview, checkAlert, unconfirmedexist} from "../services/alert.service.js";

export const createAlert = async (req,res,next) => {
    res.send(response(status.SUCCESS, await prepareAlertData(req.userId, req.body)));
}

export const userAlert = async (req,res,next) => {
    res.send(response(status.SUCCESS, await alertPreview(req.userId)));
}

export const confirmAlert = async (req,res,next) => {
    res.send(response(status.SUCCESS, await checkAlert(req.params)));
}

export const unconfirmedAlert = async (req,res,next)=>{
    res.send(response(status.SUCCESS, await unconfirmedexist(req.userId)));
}
