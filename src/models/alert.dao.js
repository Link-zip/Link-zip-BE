// models/alert.dao.js

import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { confirmAlert, insertAlert, getAlertById, getLinkById, getAlertByuserId, checkAlertByAlertId, CheckUnconfirmedAlert} from "./alert.sql.js";


// 알림 생성하는 함수
export const addAlert = async (data) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [confirm] = await conn.query(confirmAlert, [data.user_id, data.link_id, data.alert_date]);
        if(confirm[0].isExistAlert){// 같은 user, link ID에 같은 시간의 알림이 있으면 중복된 알림 처리
            conn.release();
            return -1;
        }

        const currentDate = new Date(); // 현재 날짜와 시간
        const alert = await conn.query(insertAlert, [data.user_id, data.link_id, 0, currentDate, data.alert_date, data.alert_type]);

        conn.release();
        return alert[0].insertId;
    
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}

//alert 정보 얻기
export const getAlert = async (alertId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [alert] = await conn.query(getAlertById, alertId);

        if(alert.length == 0){
            return -1;
        }

        conn.release();
        return alert;
        
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}

//link 정보 얻기
export const getLink = async (link_id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [link] = await conn.query(getLinkById, link_id);
        if(link.length == 0){
            return -1;
        }

        conn.release();
        return link;
        
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}

//해당 유저의 알림 리스트 정보 얻기
export const getUserAlert = async (userId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [result] = await conn.query("SET time_zone = 'Asia/Seoul';");
        const [alert] = await conn.query(getAlertByuserId, parseInt(userId));
        if(alert.length == 0){
            return -1;
        }

        conn.release();
        return alert;
        
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}

//알림 확인하기
export const AlertConfirm = async(alertId) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const [result] = await conn.query(checkAlertByAlertId, parseInt(alertId));
        
        if (result.affectedRows === 0) {
            return -1; 
        }
        conn.release();
        return 0;
    }
    catch (err){
        if (err.status === status.ALERT_NOT_FOUND) {
            throw err; 
        }
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}

//미확인 알림 여부 체크하기
export const AlertUnconfirm = async(userId) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const [result] = await conn.query(CheckUnconfirmedAlert, parseInt(userId));

        conn.release();
        return result;
    }
    catch (err){
        if (err.status === status.ALERT_NOT_FOUND) {
            throw err; 
        }
        throw new BaseError(status.BAD_REQUEST);
    }
    finally{
        if(conn) conn.release();
    }
}
