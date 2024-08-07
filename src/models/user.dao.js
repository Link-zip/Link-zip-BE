import { BaseError } from '@config/error.js';
import { status } from '@config/response.status.js';
import { pool } from '@config/db.config.js';

import { checkNicknameSql, insertUserSql, selectUserSql, selectUserByKakaoIdSql } from './user.sql.js';

/** 회원가입 DAO, id 리턴 */
export const addUserDao = async (data) => {
    try {
        const conn = await pool.getConnection();
        
        const [[isValid]] = await conn.query(checkNicknameSql, data.nickname);
        if (isValid.count > 0) {
            conn.release();
            throw new BaseError(status.NICKNAME_DUPLICATED);
        }

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
        console.error(error);
        throw new BaseError(status.BAD_REQUEST);
    }   
}

export const getUserByKakaoIdDao = async (kakaoId) => {
    try {
        const conn = await pool.getConnection();
        const [[result]] = await conn.query(selectUserByKakaoIdSql, kakaoId);
        conn.release();
        return result;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.BAD_REQUEST);
    }
}

/** 닉네임 중복 체크 DAO */
export const checkNicknameDao = async (nickname) => {
    try {
        const conn = await pool.getConnection();
        const [[result]] = await conn.query(checkNicknameSql, nickname);
        conn.release();
        return result; // count 반환
    } catch (error) {
        console.error(error);
        throw new BaseError(status.BAD_REQUEST);
    }
}