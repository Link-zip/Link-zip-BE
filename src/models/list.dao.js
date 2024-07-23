// models/list.dao.js

import { pool } from "@config/db.config.js";
import { BaseError } from "@config/error.js";
import { status } from "@config/response.status.js";
import { getUnviewListByUserId, getZipById } from "./list.sql.js";

//Zip의 정보를 가져오는 함수
export const getZip = async (zipId) => {
    try {
        const conn = await pool.getConnection();
        const [[zip]] = await conn.query(getZipById, parseInt(zipId));
        conn.release();
        return zip;
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }
};

//미열람 링크를 조회하는 함수 
export const getPreviewUnviewList = async (userId, sort, filter) => {
    try {
        const conn = await pool.getConnection();

        let query = getUnviewListByUserId;
        
        // 필터 조건 추가
        if (filter) {
            if (filter === "onlylink") {//text 작성하지 않은 링크만 
                query += " AND text IS NULL ";
            } else if (filter === "onlytext") {//text를 작성한 링크만 
                query += " AND text IS NOT NULL ";
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
    }
}