// src/routes/linkscount.route.js
import express from "express";
import asyncHandler from 'express-async-handler';
import {countAlert, countUnread, countOld, countTotal } from "../controllers/linkscount.controller.js";

export const linkscountrouter = express.Router();

//알림 설정한 링크 갯수
linkscountrouter.get('/alert-count', asyncHandler(countAlert));

//읽지 않은 링크 갯수
linkscountrouter.get('/unread-count',asyncHandler(countUnread));

//오래된 링크 갯수
linkscountrouter.get('/old-count', asyncHandler(countOld));

//저장된 링크 갯수
linkscountrouter.get('/total-count', asyncHandler(countTotal));


