/** 링크 검색 SQL */
export const searchLinkSql = 
    "SELECT * FROM link WHERE user_id = ? AND (title REGEXP ? OR text REGEXP ?) ORDER BY title";