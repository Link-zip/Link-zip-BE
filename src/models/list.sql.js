// models/list.sql.js
export const getUnviewListByUserId = "SELECT * FROM link WHERE user_id = ? AND visit = 0";

export const getZipById = "SELECT * FROM zip z WHERE z.id = ?";

//좋아요 리스트
export const getLikeListByUserId = "SELECT * FROM link WHERE user_id = ? AND link.like = 1";
//최근저장
export const getRecentListByUserId = "SELECT * FROM link WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 3 DAY)";

