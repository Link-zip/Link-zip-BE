/** 링크 검색 SQL */
export const searchLinkSql = 
    "SELECT link.id as link_id, link.title as link_title, url, tag, thumb, link.like, link.created_at as created_at, zip.id as zip_id, zip.title as zip_title, zip.color as zip_color FROM link JOIN zip ON zip.id = link.zip_id WHERE zip.user_id = ? AND (link.title REGEXP ? OR link.text REGEXP ?) ORDER BY link.title";