/** CREATE LINK */
// text정보가 있어서 text태그로 생성
export const insertMemoTextSql = "INSERT INTO link (zip_id, user_id, title, url, alert_date, memo, text, tag, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());";

export const insertTextSql = "INSERT INTO link (zip_id, user_id, title, url, alert_date, text, tag, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW());";

// text 가 없어서 link로 기본생성
export const insertMemoLinkSql = "INSERT INTO link (zip_id, user_id, title, url, memo, alert_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW());"

export const insertLinkSql = "INSERT INTO link (zip_id, user_id, title, url, alert_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW());"

// id로 찾은 link에 thumb값 넣기
export const updateThumbSql = "UPDATE link SET thumb = ? WHERE id = ?"

/** GET LINKS */
export const selectLinksByZipIdSql = "SELECT * FROM link WHERE zip_id = ? AND user_id = ?";

export const selectLinksByTagSql = "SELECT * FROM link WHERE zip_id = ? AND user_id = ? AND tag = ?";

export const selectLinkByIdSql = "SELECT * FROM link WHERE id = ?"

/** UPDATE VISIT */
export const updateVisitSql = "UPDATE link SET visit = visit + 1, visit_date = NOW() WHERE id = ?";

export const selectUpdatedVisitSql = "SELECT id, visit, visit_date FROM link WHERE id = ?";

/** UPDATE LIKE */
export const updateLikeSql = "UPDATE link SET `like` = CASE WHEN `like` = 0 THEN 1 ELSE 0 END WHERE id = ?";

export const selectUpdatedLikeSql = "SELECT id, `like` FROM link WHERE id = ?";

/** UPDATE ZIP ID */
export const updateZipIdSql = "UPDATE link SET zip_id = ? WHERE id = ?";

export const selectUpdatedZipIdSql = "SELECT id, zip_id FROM link WHERE id = ?"

/** DELETE LINK BY ID */
export const deleteLinkByIdSql = "DELETE FROM link WHERE id = ?";