import { pool } from "@config/db.config";
import { BaseError } from "@config/error";
import { status } from "@config/response.status";
import { deleteLinkByIdSql, insertLinkSql, selectLinkByIdSql, selectLinksByTagSql, selectLinksByZipIdSql, selectUpdatedLikeSql, selectUpdatedVisitSql, selectUpdatedZipIdSql, updateLikeSql, updateLinkSql, updateThumbSql, updateVisitSql, updateZipIdSql } from "./link.sql";


/** 링크 호출 DAO - 모든 링크, 링크태그, 텍스트태그 */

/** 링크 생성 DAO, 링크 id리턴 */
export const addLinkDao = async (userId, data) => {
    let conn;
    try {
        const {zip_id, title, text, url, memo, alert_date} = data;

        /** text값 여부에 따라 태그값 결정 */
        let tag = text != null ? 'text' : 'link';

        let values = [zip_id, userId, title, url, alert_date, memo, text, tag];

        conn = await pool.getConnection();
        const [result] = await conn.query(insertLinkSql, values) // sql쿼리에 보낼 정보
        conn.release();
        return result.insertId; // link_id
    } catch (err) {
        console.log(err);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

//링크id값 받아서 thumb값 갱신하는 dao
export const updateThumbDao = async (linkId, thumb) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [result] = await conn.query(updateThumbSql, [thumb, linkId]);
        
        conn.release();
        
        return result.affectedRows;
    } catch (err){
        console.log('thumb dao err:',err);
        throw new BaseError(status.BAD_REQUEST)
    } finally {
        if (conn) conn.release();
    }
}

export const getLinksDao = async (zipId, userId, tag, sortOrder) => {
    let sql;
    let values = [zipId, userId]; 
    let conn;
    try{
        /** tag 쿼리 여부에 따라 다른 sql문으로 쿼리 실행 */
        if (tag){
            sql = selectLinksByTagSql;
            values.push(tag);
        } else {
            sql = selectLinksByZipIdSql;
        }
        /** sortOrder 쿼리값이 있는 경우 해당 정렬 옵션으로 정렬하여 조회하는 SQL문 추가 */
        switch (sortOrder) {
            case'newest':
                sql += ' ORDER BY link.created_at DESC'; // 최신순
                break;
            case'oldest':
                sql += ' ORDER BY link.created_at ASC'; // 과거순
                break;
            case'alphabetical':
                sql += ' ORDER BY link.title ASC'; // 가나다순
                break;
            case'most_visited':
                sql += ' ORDER BY link.visit DESC'; // 방문빈도순
                break;
            default:
                sql += ' ORDER BY link.created_at DESC'; // 기본값: 최신순
                break;
        }

        conn = await pool.getConnection();
        const [result] = await conn.query(sql, values);

        conn.release();

        return result;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

export const getLinkByIdDao= async (linkId)=>{
    let conn;
    try{
        conn = await pool.getConnection();
        const [result] = await conn.query(selectLinkByIdSql, linkId);

        conn.release();

        return result[0];
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST); 
    } finally {
        if (conn) conn.release();
    }
}

export const updateVisitDao = async (linkId) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const [updateResult] = await conn.query(updateVisitSql, [linkId]);
        const [selectResult] = await conn.query(selectUpdatedVisitSql, [linkId]);

        conn.release();
        
        if (updateResult.affectedRows === 1) {
            return selectResult[0];
        } else {
            return "조회수 업데이트에 실패했습니다.";
        }
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

export const updateLikeDao = async (linkId) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const [updateResult] = await conn.query(updateLikeSql, [linkId]);
        const [selectResult] = await conn.query(selectUpdatedLikeSql, [linkId]);

        conn.release();
        if (updateResult.affectedRows === 1) {
            return selectResult[0];
        } else {
            throw new BaseError(status.NOT_FOUND);
        }
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

export const updateZipIdDao = async (linkId, newZipId) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const [updateResult] = await conn.query(updateZipIdSql, [newZipId, linkId]);
        const [selectResult] = await conn.query(selectUpdatedZipIdSql, [linkId]);

        conn.release();

        if (updateResult.affectedRows === 1) {
            return selectResult[0];
        } else {
            throw new BaseError(status.NOT_FOUND);
        }
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

export const modifyLinkDao = async (linkId, body) => {
    const {title, text, memo, alert_date} = body;
    
    let values = [title, text, memo, alert_date, linkId];
    let conn;
    try {
        conn = await pool.getConnection();
        const [updateResult] = await conn.query(updateLinkSql, values);
        const [selectResult] = await conn.query(selectLinkByIdSql, [linkId]);
        conn.release();

        if (updateResult.affectedRows === 1) {
            return selectResult[0];
        } else {
            return '수정된 링크 데이터가 없습니다.';
        }
    } catch (err) {
        console.log(err);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

export const deleteLinkByIdDao = async (linkId) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const [result] = await conn.query(deleteLinkByIdSql, [linkId]);

        conn.release();

        if (result.affectedRows === 0) {
            throw new BaseError(status.NOT_FOUND);
        } else {
            return result.affectedRows;
        }
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}