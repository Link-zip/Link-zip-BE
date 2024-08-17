// models/list.dao.js

import { pool } from "@config/db.config.js";
import { BaseError } from "@config/error.js";
import { status } from "@config/response.status.js";
import { getUnviewListByUserId, getZipById, getLikeListByUserId, getRecentListByUserId } from "./list.sql.js";

//Zip의 정보를 가져오는 함수
export const getZip = async (zipId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [[zip]] = await conn.query(getZipById, parseInt(zipId));
        conn.release();
        return zip;
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
};

//미열람 링크를 조회하는 함수 
export const getPreviewUnviewList = async (userId, sort, filter) => {
    let conn;
    try {
        conn = await pool.getConnection();

        let query = getUnviewListByUserId;
        
        // 필터 조건 추가
        if (filter) {
            if (filter === "onlylink") {//link만
                query += " AND tag = 'link' ";
            } else if (filter === "onlytext") {//text만
                query += " AND tag = 'text' ";
            }
        }
        
        // 정렬 조건 추가
        if (sort) {
            if (sort === "recent") {//최신순
                query += " ORDER BY created_at DESC";
            } else if (sort === "past") {//과거순
                query += " ORDER BY created_at ASC";
            } else if (sort === "dictionary") {//사전순
                query += " ORDER BY title ASC, created_at DESC";
            } else if (sort === "visit") {//방문순
                query += " ORDER BY visit DESC, created_at DESC";
            }
        }
        else query += " ORDER BY created_at DESC"; //쿼리가 없으면 기본값, 최신순으로 
        const [links] = await pool.query(query, parseInt(userId));
        
        // links에 대해 zip 정보 추가
        const linksWithZip = await Promise.all(links.map(async (link) => {
            const zip = await getZip(link.zip_id);
            return { ...link, zip };
        }));
        
        conn.release();
        return linksWithZip;
    
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}

//좋아요 링크를 조회하는 함수
export const getPreviewLikeList = async(userId, sort, filter)=>{
    let conn;
    try {
        conn = await pool.getConnection();
        let query = getLikeListByUserId;
        
        // 필터 조건 추가
        if (filter) {
            if (filter === "onlylink") {//link만
                query += " AND tag = 'link' ";
            } else if (filter === "onlytext") {//text만
                query += " AND tag = 'text' ";
            }
        }
        
        // 정렬 조건 추가
        if (sort) {
            if (sort === "recent") {//최신순
                query += " ORDER BY created_at DESC";
            } else if (sort === "past") {//과거순
                query += " ORDER BY created_at ASC";
            } else if (sort === "dictionary") {//사전순
                query += " ORDER BY title ASC, created_at DESC";
            } else if (sort === "visit") {//방문순
                query += " ORDER BY visit DESC, created_at DESC";
            }
        }
        else query += " ORDER BY created_at DESC"; //쿼리가 없으면 기본값, 최신순으로 

        const [links] = await pool.query(query, parseInt(userId));


        // links에 대해 zip 정보 추가
        const linksWithZip = await Promise.all(links.map(async (link) => {
            const zip = await getZip(link.zip_id);
            return { ...link, zip };
        }));
        
        conn.release();
        return linksWithZip;
    
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}

//최근 저장 링크를 조회하는 함수 
export const getPreviewRecentList = async(userId, sort, filter)=>{
    let conn;
    try {
        conn = await pool.getConnection();

        let query = getRecentListByUserId;
        
        // 필터 조건 추가
        if (filter) {
            if (filter === "onlylink") {//link만
                query += " AND tag = 'link' ";
            } else if (filter === "onlytext") {//text만
                query += " AND tag = 'text' ";
            }
        }
        
        // 정렬 조건 추가
        if (sort) {
            if (sort === "recent") {//최신순
                query += " ORDER BY created_at DESC";
            } else if (sort === "past") {//과거순
                query += " ORDER BY created_at ASC";
            } else if (sort === "dictionary") {//사전순
                query += " ORDER BY title ASC, created_at DESC";
            } else if (sort === "visit") {//방문순
                query += " ORDER BY visit DESC, created_at DESC";
            }
        }
        else query += " ORDER BY created_at DESC"; //쿼리가 없으면 기본값, 최신순으로 

        const [links] = await pool.query(query, parseInt(userId));
        
        // links에 대해 zip 정보 추가
        const linksWithZip = await Promise.all(links.map(async (link) => {
            const zip = await getZip(link.zip_id);
            return { ...link, zip };
        }));
        
        conn.release();
        return linksWithZip;
    
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }finally{
        if(conn) conn.release();
    }
}