import { pool } from "@config/db.config";
import { BaseError } from "@config/error";
import { status } from "@config/response.status";
import { deleteLinkByIdSql, insertLinkSql, selectLinkByIdSql, selectLinksByTagSql, selectLinksByZipIdSql, selectUpdatedLikeSql, selectUpdatedVisitSql, selectUpdatedZipIdSql, updateLikeSql, updateLinkSql, updateThumbSql, updateVisitSql, updateZipIdSql } from "./link.sql";


/** 링크 호출 DAO - 모든 링크, 링크태그, 텍스트태그 */

/** 링크 생성 DAO, 링크 id리턴 */
export const addLinkDao = async (userId, data) => {
    try {
        const {zip_id, title, text, url, memo, alert_date} = data;

        /** text값 여부에 따라 태그값 결정 */
        let tag = text != null ? 'text' : 'link';

        let values = [zip_id, userId, title, url, alert_date, memo, text, tag];

        const conn = await pool.getConnection();
        const [result] = await conn.query(insertLinkSql, values) // sql쿼리에 보낼 정보
        conn.release();
        return result.insertId; // link_id
    } catch (err) {
        console.log(err);
        throw new BaseError(status.BAD_REQUEST);
    }
}

//링크id값 받아서 thumb값 갱신하는 dao
export const updateThumbDao = async (linkId, thumb) => {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(updateThumbSql, [thumb, linkId]);
        
        conn.release();
        
        return result.affectedRows;
    } catch (err){
        console.log('thumb dao err:',err);
        throw new BaseError(status.BAD_REQUEST)
    }
}

export const getLinksDao = async (zipId, userId, tag) => {
    let sql;
    let values = [zipId, userId, tag]; 
    try{
        if (tag == 'link' || tag == 'text'){
            sql = selectLinksByTagSql;
        } else {
            sql = selectLinksByZipIdSql;
            values.splice(2,1); // zipId, userId만 전달
        }
        const conn = await pool.getConnection();
        const [result] = await conn.query(sql, values);

        conn.release();

        return result;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.BAD_REQUEST);
    }
}

export const getLinkByIdDao= async (linkId)=>{
    try{
        const conn = await pool.getConnection();
        const [result] = await conn.query(selectLinkByIdSql, linkId);

        conn.release();

        return result[0];
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST); 
    }
}

export const updateVisitDao = async (linkId) => {
    try{
        const conn = await pool.getConnection();
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
    }
}

export const updateLikeDao = async (linkId) => {
    try{
        const conn = await pool.getConnection();
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
    }
}

export const updateZipIdDao = async (linkId, newZipId) => {
    try{
        const conn = await pool.getConnection();
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
    }
}

export const modifyLinkDao = async (linkId, body) => {
    const {title, text, memo, alert_date} = body;
    
    let values = [title, text, memo, alert_date, linkId];

    try {
        const conn = await pool.getConnection();
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
    }
}

export const deleteLinkByIdDao = async (linkId) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await conn.query(deleteLinkByIdSql, [linkId]);

        conn.release();

        if (result.affectedRows === 0) {
            throw new BaseError(status.NOT_FOUND);
        } else {
            return result.affectedRows;
        }
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }
}