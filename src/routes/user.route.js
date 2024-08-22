import express from 'express';
import asyncHandler from 'express-async-handler';
import { getUserCnt, patchUserInfoCnt, deleteUserCnt } from '@controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.get("/info", asyncHandler(getUserCnt)); // 정보 조회
userRouter.patch("/", asyncHandler(patchUserInfoCnt)); // 정보 수정
userRouter.delete("/delete", asyncHandler(deleteUserCnt)); // 회원 탈퇴