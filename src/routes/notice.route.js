// src/route/notice.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import { createNewNoticeCnt, deleteNoticeByIdCnt, getAllNoticeCnt, getNoticeByIdCnt } from '@controllers/notice.controller';


export const noticeRouter = express.Router();

/** GET API */
noticeRouter.get("/", asyncHandler(getAllNoticeCnt));
noticeRouter.get("/:notice_id", asyncHandler(getNoticeByIdCnt));
/** POST API */
noticeRouter.post("/add", asyncHandler(createNewNoticeCnt));
/** DELETE API */
noticeRouter.delete("/delete/:notice_id", asyncHandler(deleteNoticeByIdCnt));