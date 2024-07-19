import { BaseError } from '@config/error.js';
import { status } from '@config/response.status.js';
import { pool } from '@config/db.config.js';

import { insertUserSql, selectUserSql } from './user.sql.js';

export const addUserDao = async (data) => {
    try {
        const conn = await pool.getConnection();
        const [[result]] = await pool.query(insertUserSql, [
            data.kakaoId,
            data.nickname,
        ])
        console.log("result", result)
        conn.release();
        return result.insertId;
    } catch (error) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const getUserDao = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [[result]] = await pool.query(selectUserSql, userId);
        conn.release();
        return result;
    } catch (error) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }   
}