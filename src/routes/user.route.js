import express from 'express';
import asyncHandler from 'express-async-handler';
import { kakaoLoginCnt, addUserCnt, getUserCnt, checkNicknameCnt } from '@controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.get("/info", asyncHandler(getUserCnt)); // 정보 조회