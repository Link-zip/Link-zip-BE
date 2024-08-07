// alert.service.js

import { BaseError } from "@config/error.js";
import { status } from "@config/response.status.js";
import { alertAddResponseDTO, alertPreviewResponseDTO, alertConfirmResponseDTO, alertDeleteResponseDTO } from "@dtos/alert.dto.js";
import { addAlert, getAlert, getLink,  getUserAlert, AlertConfirm, AlertDelete } from "@models/alert.dao.js";

//알림 생성
export const prepareAlertData = async (userId, body) => {
    const AlertData = await addAlert({
        'user_id': userId,
        'link_id': body.linkId,
        'alert_date': body.alert_date,
        'alert_type': body.alert_type
    })

    if(AlertData==-1)//같은 user_id, link_id의 같은 날짜의 알림이 있는 경우
        throw new BaseError(status.ALERT_ALREADY_EXIST)//중복된 알림 
    
    return alertAddResponseDTO(await getAlert(AlertData), await getLink(body.linkId));
}

//알림 조회
export const alertPreview= async (userId) => {
    const alerts = await getUserAlert(userId);
    
    if (alerts==-1) {
        throw new BaseError(status.ALERT_NOT_FOUND); 
    }
    else{
        const alertsWithLinks = await Promise.all(alerts.map(async alert => {
            const link = await getLink(alert.link_id); 
            return { ...alert, link };
        }));

        return alertPreviewResponseDTO(alertsWithLinks);
    }
}

//알림 확인
export const checkAlert = async (data) => {
    const AlertData = await AlertConfirm(data.alertId);
    if(AlertData==-1) throw new BaseError(status.ALERT_NOT_FOUND); 
    return alertConfirmResponseDTO();
}

//알림 삭제
export const eraseAlert = async(data) => {
    const AlertData = await AlertDelete(data.alertId);
    if(AlertData==-1) throw new BaseError(status.ALERT_NOT_FOUND); 
    return alertDeleteResponseDTO();
}