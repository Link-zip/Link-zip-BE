// GET SQL
export const getZipsSql = 
    "SELECT zip.*, COUNT(link.id) AS link_count "+
    "FROM zip LEFT JOIN link ON zip.id = link.zip_id "+
    "WHERE zip.user_id = ? "+
    "GROUP BY zip.id " +
    "ORDER BY (CASE WHEN zip.status = 'default' THEN 1 ELSE 2 END), ";
    


// POST SQL
export const createDefaultZipSql = 
    "INSERT INTO zip (user_id, title, color, status, latest_date) VALUES (?, '빠른 저장', 'default', 'default', CURRENT_TIME(6))";

export const createZipSql =
    "INSERT INTO zip (user_id, title, color, status, latest_date) VALUES (?, ?, ?, 'custom', CURRENT_TIME(6))";

// DELETE SQL
export const testZipDeletableSql =
    "SELECT status FROM zip WHERE id = ? AND user_id = ?";

export const deleteZipSql = 
    "DELETE FROM zip WHERE id = ? AND user_id = ?";

// PATCH SQL
export const editZipSql =
    "UPDATE zip SET title = ?, color = ? WHERE user_id = ? AND id = ?";

