// models/list.sql.js
export const getUnviewListByUserId = "SELECT * FROM link WHERE user_id = ? AND visit = 0";

export const getZipById = "SELECT * FROM zip z WHERE z.id = ?";