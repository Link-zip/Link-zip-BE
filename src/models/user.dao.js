import { BaseError } from '@config/error.js';
import { status } from '@config/response.status.js';
import { pool } from '@config/db.config.js';

import { insertUserSql, selectUserSql } from './user.sql.js';

/** 회원가입 DAO, id 리턴 */
export const addUserDao = async (data) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(insertUserSql, [
            data.kakaoId,
            data.nickname
        ])
        conn.release();
        return result.insertId;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.BAD_REQUEST);
    }
}

/** 사용자 정보 조회 DAO */
export const getUserDao = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [[result]] = await conn.query(selectUserSql, userId);
        conn.release();
        return result;
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }   
}