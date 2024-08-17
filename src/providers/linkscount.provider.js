//linkscount.provider.js
import { alertCountResponseDTO, unreadCountResponseDTO, oldCountResponseDTO, totalCountResponseDTO } from "@dtos/linkscount.dto.js";
import {getUserAlertCount, getUserUnreadCount, getUserOldCount, getUserTotalCount} from "@models/linkscount.dao.js";

export const alertCountData= async (userId) => {
    const count = await getUserAlertCount(userId);
    return alertCountResponseDTO(count);
    
}

export const unreadCountData= async (userId) => {
    const count = await getUserUnreadCount(userId);
    return unreadCountResponseDTO(count);
    
}

export const oldCountData= async (userId) => {
    const count = await getUserOldCount(userId);
    return oldCountResponseDTO(count);
    
}

export const totalCountData= async (userId) => {
    const count = await getUserTotalCount(userId);
    return totalCountResponseDTO(count);
    
}