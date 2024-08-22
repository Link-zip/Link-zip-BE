/** CREATE LINK */
export const insertLinkSql = "INSERT INTO link (zip_id, user_id, title, url, alert_date, memo, text, tag, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";

export const insertLinkAlertSql = "INSERT INTO alert (user_id, link_id, created_at, alert_date, alert_type) VALUES (?,?,NOW(),?,'original')";

export const insertLinkReminderAlertSql = "INSERT INTO alert (user_id, link_id, alert_status, created_at, alert_date, alert_type) VALUES (?, ?, 0, NOW(), DATE_ADD(?, INTERVAL 1 DAY), 'reminder')";

// id로 찾은 link에 thumb값 넣기
export const updateThumbSql = "UPDATE link SET thumb = ? WHERE id = ?"

/** GET LINKS */
export const selectLinksByZipIdSql = `
    SELECT link.*, zip.color AS zip_color, zip.title AS zip_title
    FROM link
    JOIN zip ON link.zip_id = zip.id
    WHERE link.zip_id = ? AND link.user_id = ?
`;

export const selectLinksByTagSql = `
    SELECT link.*, zip.color AS zip_color, zip.title AS zip_title
    FROM link
    JOIN zip ON link.zip_id = zip.id
    WHERE link.zip_id = ? AND link.user_id = ? AND link.tag = ?
`;

export const selectLinkByIdSql = `
    SELECT link.*, zip.color AS zip_color, zip.title AS zip_title
    FROM link
    JOIN zip ON link.zip_id = zip.id
    WHERE link.id = ?
`;

export const existingAlertSql = 'SELECT * FROM alert WHERE link_id = ?';

/** UPDATE VISIT */
export const updateVisitSql = "UPDATE link SET visit = visit + 1, visit_date = NOW() WHERE id = ?";

export const selectUpdatedVisitSql = "SELECT id, visit, visit_date FROM link WHERE id = ?";

export const deleteReminderAlertSql = `DELETE FROM alert WHERE link_id = ? AND alert_type = 'reminder' AND alert_date > NOW()
     AND DATE_SUB(alert_date, INTERVAL 1 DAY) < NOW();`

/** UPDATE LIKE */
export const updateLikeSql = "UPDATE link SET `like` = CASE WHEN `like` = 0 THEN 1 ELSE 0 END WHERE id = ?";

export const selectUpdatedLikeSql = "SELECT id, `like` FROM link WHERE id = ?";

/** UPDATE ZIP ID */
export const updateZipIdSql = "UPDATE link SET zip_id = ? WHERE id = ?";

export const selectUpdatedZipIdSql = "SELECT id, zip_id FROM link WHERE id = ?"

/** UPDATE LINK */
export const updateLinkSql = "UPDATE link SET title = ?, text = ?, memo = ?, alert_date = ? WHERE id = ?;";

/** UPDATE ALERT DATE */
export const updateLinkAlertDateSql = `
    UPDATE alert
    SET alert_date = ?, updated_at = NOW() 
    WHERE link_id = ?;
`
/** DELETE LINK BY ID */
export const deleteLinkByIdSql = "DELETE FROM link WHERE id = ?";