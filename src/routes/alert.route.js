// src/routes/alert.route.js
import express from "express";
import asyncHandler from 'express-async-handler';
import { createAlert, userAlert, confirmAlert, deleteAlert } from "../controllers/alert.controller.js";

export const alertRouter = express.Router();

// 알림 생성
alertRouter.post('/add', asyncHandler(createAlert));
// 알림 조회(리스트)
alertRouter.get('',asyncHandler(userAlert));
//알림 확인 
alertRouter.put('/confirm/:alertId', asyncHandler(confirmAlert));
// 알림 삭제
alertRouter.delete('/:alertId', asyncHandler(deleteAlert));