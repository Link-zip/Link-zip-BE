import express from 'express';
import asyncHandler from 'express-async-handler';
<<<<<<< HEAD
import { getUserCnt, patchUserInfoCnt } from '@controllers/user.controller.js';
=======
import { getUserCnt, refreshTokenCnt } from '@controllers/user.controller.js';
>>>>>>> 55e1f6d ([#41] Feat: 토큰 재발급 구현)

export const userRouter = express.Router();

userRouter.get("/info", asyncHandler(getUserCnt)); // 정보 조회
userRouter.patch("/", asyncHandler(patchUserInfoCnt)); // 정보 수정