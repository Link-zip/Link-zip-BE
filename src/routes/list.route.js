// src/routes/list.route.js
import express from "express";
import asyncHandler from "express-async-handler";
import { viewUnviewList, viewLikeList, viewRecentList } from "../controllers/list.controller.js";

export const listRouter = express.Router();

// 미열람 링크 조회
listRouter.get('/unview', asyncHandler(viewUnviewList));
// 좋아요 링크 조회
listRouter.get('/like', asyncHandler(viewLikeList));
// 최신저장 링크 조회
listRouter.get('/recent', asyncHandler(viewRecentList));