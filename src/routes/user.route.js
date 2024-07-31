import express from 'express';
import asyncHandler from 'express-async-handler';
import { addUserCnt, getUserCnt, checkNicknameCnt } from '@controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.get("/:userId", asyncHandler(getUserCnt)); // 정보 조회
userRouter.get("/", asyncHandler(checkNicknameCnt)); // 닉네임 중복 체크

userRouter.post("/", asyncHandler(addUserCnt)); // 회원가입