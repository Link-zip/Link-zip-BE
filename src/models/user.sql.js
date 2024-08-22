export const insertUserSql = "INSERT INTO user (kakao_id, nickname, created_at, updated_at, status) VALUES (?, ?, NOW(), NOW(), 'ACTIVE');";

export const selectUserSql = "SELECT * FROM user WHERE id = ?";

export const selectUserByKakaoIdSql = "SELECT * FROM user WHERE kakao_id = ?";

export const checkNicknameSql = "SELECT count(*) as count FROM user WHERE nickname = ?";

export const updateUserSql = "UPDATE user SET nickname = ?, updated_at = NOW() WHERE id = ?";

export const deleteAllLinksOfUserSql = "DELETE FROM link WHERE user_id = ?";

export const deleteUserSql = "DELETE FROM user WHERE id = ?";