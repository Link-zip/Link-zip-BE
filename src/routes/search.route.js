import express from 'express';
import asyncHandler from 'express-async-handler';
import { searchLinkController } from '@controllers/search.controller';


export const searchRouter = express.Router();

/** GET API */
searchRouter.get("/", asyncHandler(searchLinkController));