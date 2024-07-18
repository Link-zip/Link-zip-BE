// src/routes/list.route.js
import express from "express";
import asyncHandler from "express-async-handler";
import { viewUnviewList } from "../controllers/list.controller.js";

export const listRouter = express.Router();

// 미열람 링크 조회
listRouter.get('/unview/:userId', asyncHandler(viewUnviewList));