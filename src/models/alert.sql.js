// modles/alert.sql.js
export const confirmAlert= "SELECT EXISTS(SELECT 1 FROM alert WHERE user_id = ? && link_id = ? && alert_date = ?) as isExistAlert";
export const insertAlert = "INSERT INTO alert (user_id, link_id, alert_status, created_at, alert_date, alert_type) VALUES (?, ?, ?, ?, ?, ?)";

export const getAlertById = "SELECT * FROM alert a WHERE a.id = ?";
export const getLinkById = "SELECT * FROM link l WHERE l.id = ?";
export const getAlertByuserId = "SELECT * FROM alert a where a.user_id = ?";

export const checkAlertByAlertId = "UPDATE alert SET alert_status = 1 WHERE id = ?";
