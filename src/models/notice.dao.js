import { pool } from "@config/db.config";
import { BaseError } from "@config/error";
import { status } from "@config/response.status";
import { insertNoticeSql, selectAllNoticesSql, deleteNoticeByIdSql, selectNoticeByIdSql }  from "./notice.sql"


export const addNoticeDao = async (data) => {
    const {title, content} = data;
    let conn;
    try{
        conn = await pool.getConnection();
        const [result] = await conn.query(insertNoticeSql, [title, content]);
        conn.release();
        return result.insertId;
    }catch(err) {
        console.log('insertNoticeSql Error:',err);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

export const getAllNoticeDao = async () => {
    let conn;
    try{
        conn = await pool.getConnection();
        const [result] = await conn.query(selectAllNoticesSql);
        conn.release();

        return result;
    } catch (err){
        console.log('selectAllNoticesSql Error:',err);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

export const getNoticeByIdDao = async (noticeId) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const [result] = await conn.query(selectNoticeByIdSql, [noticeId]);
        conn.release();

        return result[0];
    } catch (err){
        console.log('selectNoticeByIdSql Error:',err);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}

export const deleteNoticeDao = async (noticeId) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const [result] = await conn.query(deleteNoticeByIdSql, [noticeId]);
        conn.release();

        return result.affectedRows;
    } catch (err){
        console.log('selectNoticeByIdSql Error:',err);
        throw new BaseError(status.BAD_REQUEST);
    } finally {
        if (conn) conn.release();
    }
}