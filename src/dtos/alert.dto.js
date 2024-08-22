// dtos/list.dto.js

//알림 생성 dto
export const alertAddResponseDTO = (alert, link) => {
  return {
    message: "알림이 생성되었습니다."
  };
}

// 알림 조회 dto
export const alertPreviewResponseDTO = (alerts) => {

  const newAlerts = alerts.map(alert => ({
      "alert_id": alert.id,
      "alert_status": alert.alert_status,
      "alert_date": alert.alert_date,
      "alert_type": alert.alert_type,
      "relative_time": getRelativeTime(alert.alert_date), // ~몇분전
      "link": {
          "id": alert.link[0].id,
          "title": alert.link[0].title,
          "memo": alert.link[0].memo,
          "tag": alert.link[0].tag
      },
  }));
  
  return { newAlerts };
}

//알람 확인 dto
export const alertConfirmResponseDTO = () => {
  return {
    message: "알림이 확인되었습니다."
  };
}
  
export const alertUncofirmedExistResponseDTO = (data) => {
  let result = false;
  if(data[0].isExist==1) result = true
  return {
    "uncomfirmedAlert": result
  }
}

const getRelativeTime = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return `${diffInSeconds}초 전`;
};