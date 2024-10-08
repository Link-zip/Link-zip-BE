export const selectAllNoticesSql = 'SELECT * FROM notice ORDER BY created_at DESC';

export const selectNoticeByIdSql = 'SELECT * FROM notice WHERE id = ?';

export const insertNoticeSql = 'INSERT INTO notice (title, content, created_at, updated_at) VALUES (?,?,NOW(),NOW())';

export const deleteNoticeByIdSql = 'DELETE FROM notice WHERE id = ?';