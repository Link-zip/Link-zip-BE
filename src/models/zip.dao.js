import { pool } from '@config/db.config.js';
import { BaseError } from '@config/error.js';
import { status } from '@config/response.status.js';
import { createZipSql, deleteZipSql, testZipDeletableSql, getZipsSql } from '@models/zip.sql.js';

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
              console.log("최신순");
              sql += ", zip.created_at ORDER BY zip.created_at DESC";
              console.log(sql);
              break;
          case 'earliest':
              console.log("과거순");
              sql += ", zip.created_at ORDER BY zip.created_at";
              break;
          case 'alphabet':
              console.log("가나다순");
              sql += ", zip.title ORDER BY zip.title";
              break;
          case 'visit':
              console.log("방문빈도순");
              sql += ", zip.title ORDER BY IFNULL(SUM(link.visit),0) DESC, zip.title";
              break;
          default:
              console.log("잘못된 요청입니다.")
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