// src/routes/list.route.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import { getSummary } from '../controllers/link.controller';
//controller

export const linkRouter = express.Router();

// 텍스트 요약(url전송)
linkRouter.post('/summary', asyncHandler(getSummary));