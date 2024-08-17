import { pool } from "@config/db.config";
import { BaseError } from "@config/error";
import { status } from "@config/response.status";
import { searchLinkSql } from "@models/search.sql";

/** 링크 검색 Dao */
export const searchLinkDao = async (user_id, keyword) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await conn.query(searchLinkSql, [
            user_id,
            keyword,
            keyword
        ]);
        conn.release();
        return result;
    } catch(err) {
        conn.release();
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}
