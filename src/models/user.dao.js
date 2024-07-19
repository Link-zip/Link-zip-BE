import { BaseError } from '@config/error.js';
import { status } from '@config/response.status.js';
import { pool } from '@config/db.config.js';

import { insertUserSql, selectUserSql } from './user.sql.js';

export const addUserDao = async (data) => {
    try {
        const conn = await pool.getConnection();
        const [[result]] = await pool.query(insertUserSql, [
            data.nickname,
            data.kakaoId,
        ])
        conn.release();
        return result;
    } catch (error) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR, error);
    }
}

export const getUserDao = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [[result]] = await pool.query(selectUserSql, userId);
        conn.release();
        return result;
    } catch (error) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR, error);
    }   
}