import { BaseError } from '@config/error.js';
import { status } from '@config/response.status.js';
import { pool } from '@config/db.config.js';

import { checkNicknameSql, insertUserSql, selectUserSql, selectUserByKakaoIdSql, updateUserSql } from './user.sql.js';
import { createDefaultZipSql } from './zip.sql.js';

/** 회원가입 DAO, id 리턴 */
export const addUserDao = async (data) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [[isValid]] = await conn.query(checkNicknameSql, data.nickname);
        if (isValid.count > 0) {
            conn.release();
            throw new BaseError(status.NICKNAME_DUPLICATED);
        }

        const [result] = await conn.query(insertUserSql, [
            data.kakaoId,
            data.nickname
        ])
        await conn.query(createDefaultZipSql, result.insertId);
        conn.release();
        return result.insertId;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

/** 사용자 정보 조회 DAO */
export const getUserDao = async (userId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [[result]] = await conn.query(selectUserSql, userId);
        conn.release();
        return result;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

/** 카카오 id로 사용자 조회 DAO */
export const getUserByKakaoIdDao = async (kakaoId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [[result]] = await conn.query(selectUserByKakaoIdSql, kakaoId);
        conn.release();
        return result;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

/** 닉네임 중복 체크 DAO, count 리턴 */
export const checkNicknameDao = async (nickname) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [[result]] = await conn.query(checkNicknameSql, nickname);
        conn.release();
        return result; // count 반환
    } catch (error) {
        console.error(error);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

/** 사용자 정보 수정 DAO, 수정된 row 갯수 리턴 */
export const patchUserInfoDao = async (userId, nickname) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [result] = await conn.query(updateUserSql, [nickname, userId]);
        conn.release();
        return result.affectedRows;
    } catch (error) {
        console.error(error);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}