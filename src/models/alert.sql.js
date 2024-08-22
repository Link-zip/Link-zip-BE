// modles/alert.sql.js
export const confirmAlert= "SELECT EXISTS(SELECT 1 FROM alert WHERE user_id = ? && link_id = ? && alert_date = ?) as isExistAlert";
export const insertAlert = "INSERT INTO alert (user_id, link_id, alert_status, created_at, alert_date, alert_type) VALUES (?, ?, ?, ?, ?, ?)";

export const getAlertById = "SELECT * FROM alert a WHERE a.id = ?";
export const getLinkById = "SELECT id,title,memo,tag FROM link l WHERE l.id = ?";
export const getAlertByuserId = `SELECT a.*, l.id as link_id, l.title, l.memo 
FROM alert a JOIN link l ON a.link_id = l.id
WHERE a.user_id = ? AND a.alert_date < NOW()
ORDER BY a.alert_date DESC`;


export const checkAlertByAlertId = "UPDATE alert SET alert_status = 1 WHERE id = ?";

export const CheckUnconfirmedAlert = "SELECT COUNT(*) > 0 as `isExist` FROM alert WHERE user_id = ? AND alert_status = 0 AND alert_date < NOW()";
