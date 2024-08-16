
// 최근 한달 기준: 사용자가 접속한 날짜(현재 날짜) 기준으로 한달 뒤까지의 날짜
// 최근 한달 기준의 알림 설정한 링크 갯수(알림 갯수)
export const getAlertCountByUserId = "SELECT COUNT(*) AS alert_count FROM alert a JOIN link l ON a.link_id = l.id WHERE a.user_id = ? AND a.alert_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 MONTH);";

// 최근 한달 기준의 알림 설정한 링크 갯수 중 읽지 않은 링크 갯수
export const getUnreadCountByUserId = "SELECT COUNT(*) AS unread_count FROM alert a JOIN link l ON a.link_id = l.id WHERE a.user_id = ? AND l.visit = 0 AND a.alert_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 MONTH);";

//알림 날짜로부터 한달 이상 읽지 않은 링크의 갯수
export const getOldCountByUserId ="SELECT COUNT(*) AS old_count FROM alert a JOIN link l ON a.link_id = l.id WHERE a.user_id = ? AND l.visit = 0 AND a.alert_date <= DATE_SUB(CURDATE(), INTERVAL 1 MONTH);";
//저장된 링크 갯수
export const getTotalCountByUserId ="SELECT COUNT(*) AS total_count FROM link WHERE user_id = ?;";