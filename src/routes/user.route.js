import express from 'express';
import asyncHandler from 'express-async-handler';
import { addUserCnt, getUserCnt } from '@controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.post('/', asyncHandler(addUserCnt));

userRouter.get('/:userId', asyncHandler(getUserCnt));