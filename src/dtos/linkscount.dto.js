// dtos/linkscount.dto.js

export const alertCountResponseDTO = (data) => {
    return {
      "recent_alerts_count": data[0].alert_count
    };
}

export const unreadCountResponseDTO = (data) => {
    return {
      "unread_links_count": data[0].unread_count
    };
}

export const oldCountResponseDTO = (data) => {
    return {
      "old_links_count": data[0].old_count
    };
}

export const totalCountResponseDTO  = (data) => {
    return {
      "total_links_count": data[0].total_count
    };
}

