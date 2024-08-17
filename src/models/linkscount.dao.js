//linkscount.dao.js
import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getAlertCountByUserId, getUnreadCountByUserId, getOldCountByUserId, getTotalCountByUserId} from "./linkscount.sql.js";

export const getUserAlertCount= async (userId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [count] = await pool.query(getAlertCountByUserId, userId);
        conn.release();
        return count;
        
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}

export const getUserUnreadCount= async (userId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [count] = await pool.query(getUnreadCountByUserId, userId);
        conn.release();
        return count;
        
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}

export const getUserOldCount= async (userId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [count] = await pool.query(getOldCountByUserId, userId);
        conn.release();
        return count;
        
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}

export const getUserTotalCount= async (userId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [count] = await pool.query(getTotalCountByUserId, userId);

        conn.release();
        return count;
        
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}