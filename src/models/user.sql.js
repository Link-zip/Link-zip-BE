export const insertUserSql = "INSERT INTO user (kakao_id, nickname, created_at, updated_at, status) VALUES (?, ?, NOW(), NOW(), 'ACTIVE');";

export const selectUserSql = "SELECT * FROM user WHERE id = ?";

export const checkNicknameSql = "SELECT count(*) as count FROM user WHERE nickname = ?";