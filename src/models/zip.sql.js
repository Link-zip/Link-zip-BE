// GET SQL


// POST SQL
export const createDefaultZipSql = 
    "INSERT INTO zip (user_id, title, color, status, latest_date) VALUES (?, '빠른 저장', '000000', 'default', CURRENT_TIME(6))";

export const createZipSql =
    "INSERT INTO zip (user_id, title, color, image, status, latest_date) VALUES (?, ?, ?, ?, 'custom', CURRENT_TIME(6))";

// DELETE SQL
export const testZipDeletableSql =
    "SELECT status FROM zip WHERE id = ? AND user_id = ?";

export const deleteZipSql = 
    "DELETE FROM zip WHERE id = ? AND user_id = ? AND status != 'default'";

