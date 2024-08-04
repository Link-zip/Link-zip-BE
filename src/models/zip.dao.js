import { pool } from '@config/db.config.js';
import { BaseError } from '@config/error.js';
import { status } from '@config/response.status.js';
import { createZipSql, deleteZipSql, testZipDeletableSql, getZipsSql, editZipSql } from '@models/zip.sql.js';

// POST API
/** Zip 생성 Dao */
export const createZipDao = async(dto) => {
    try{
        const conn = await pool.getConnection();

        const result = await conn.query(createZipSql,[
            dto.user_id,
            dto.title,
            dto.color,
            dto.image
        ]);
        
        conn.release();
        return result[0].insertId;
    } catch (err) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

//DELETE API
/** Zip이 삭제 가능한지 검증하기 위한 Dao */
export const testZipDeletableDao = async(dto) => {
    try {
        const conn = await pool.getConnection();

        const [result] = await conn.query(testZipDeletableSql, [
            dto.zip_id,
            dto.user_id
        ]);

        conn.release();
        dto.status = result[0].status;
        return dto;
    } catch (err){
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

/** Zip 삭제 Dao */
export const deleteZipDao = async(dto) => {
    try {
        const conn = await pool.getConnection();
        await conn.query(deleteZipSql, [
            dto.zip_id,
            dto.user_id
        ]);

        conn.release();
        return dto;
    } catch(err) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

// GET API
/** Zip 조회 Dao */
export const getZipsDao = async(sort, user_id) => {
    try {
        const conn = await pool.getConnection();
        let sql = getZipsSql;
        switch(sort) {
          case 'latest':
              sql += "zip.created_at DESC";
              break;
          case 'earliest':
              sql += "zip.created_at";
              break;
          case 'alphabet':
              sql += "zip.title";
              break;
          case 'visit':
              sql += "IFNULL(SUM(link.visit),0) DESC, zip.title";
              break;
          default:
              throw new BaseError(status.BAD_REQUEST);
        }

        let [result] = await conn.query(sql, user_id);
        conn.release();

        return result;
    } catch(err) {
        if(err.data !== status.BAD_REQUEST){
            throw new BaseError(status.INTERNAL_SERVER_ERROR);
        }
        else{
            throw err;
        }
    }
}

//PATCH API
/** Zip 수정 Dao */
export const editZipDao = async(reqDto) => {
    try{
        const conn = await pool.getConnection();
        await conn.query(editZipSql, [
            reqDto.title,
            reqDto.color,
            reqDto.user_id,
            reqDto.zip_id
        ])
        conn.release();
        return reqDto.zip_id;
    } catch(err) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}