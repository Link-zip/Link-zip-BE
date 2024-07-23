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
      "id": alert.id,
      "alert_status": alert.alert_status,
      "created_at": formatDate(alert.created_at),
      "alert_date": formatDate(alert.alert_date),
      "alert_type": alert.alert_type,
      "updated_at": formatDate(alert.updated_at),
      "link": {
          "id": alert.link[0].id,
          "title": alert.link[0].title,
          "thumb": alert.link[0].thumb,
      },
  }));
  
  return { "alerts": newAlerts };
}

//알람 확인 dto
export const alertConfirmResponseDTO = () => {
  return {
    message: "알림이 확인되었습니다."
  };
}

export const alertDeleteResponseDTO = () => {
  return{
    message: "알림이 삭제되었습니다."
  };
}



const formatDate = (dateTimeString) => {
    // 날짜 및 시간 값이 올바른 형식인지 확인
    const validDateTime = new Date(dateTimeString);
    if (isNaN(validDateTime.getTime())) {
      // 날짜 및 시간 값이 유효하지 않은 경우 에러 처리
      throw new Error('Invalid date and time format');
    }
  
    // 날짜 및 시간 값이 유효한 경우 포맷팅
    return new Intl.DateTimeFormat('kr', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(validDateTime);
  };
  