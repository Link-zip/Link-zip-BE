import { pool } from "@config/db.config";
import { BaseError } from "@config/error";
import { status } from "@config/response.status";
import { insertNoticeSql, selectAllNoticesSql, deleteNoticeByIdSql, selectNoticeByIdSql }  from "./notice.sql"


export const addNoticeDao = async (data) => {
    const {title, content} = data;

    try{
        const conn = await pool.getConnection();
        const [result] = await conn.query(insertNoticeSql, [title, content]);
        conn.release();
        return result.insertId;
    }catch(err) {
        console.log('insertNoticeSql Error:',err);
        throw new BaseError(status.BAD_REQUEST);
    }
}

export const getAllNoticeDao = async () => {
    try{
        const conn = await pool.getConnection();
        const [result] = await conn.query(selectAllNoticesSql);
        conn.release();

        return result;
    } catch (err){
        console.log('selectAllNoticesSql Error:',err);
        throw new BaseError(status.BAD_REQUEST);
    }
}

export const getNoticeByIdDao = async (noticeId) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await conn.query(selectNoticeByIdSql, [noticeId]);
        conn.release();

        return result[0];
    } catch (err){
        console.log('selectNoticeByIdSql Error:',err);
        throw new BaseError(status.BAD_REQUEST);
    }
}

export const deleteNoticeDao = async (noticeId) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await conn.query(deleteNoticeByIdSql, [noticeId]);
        conn.release();

        return result.affectedRows;
    } catch (err){
        console.log('selectNoticeByIdSql Error:',err);
        throw new BaseError(status.BAD_REQUEST);
    }
}