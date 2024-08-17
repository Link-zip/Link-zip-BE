import express from 'express';
import asyncHandler from 'express-async-handler';
import { searchLinkController, getSearchLogController, deleteLogByKeywordController, deleteAllSearchLogsController } from '@controllers/search.controller';


export const searchRouter = express.Router();

/** GET API */
searchRouter.get("/", asyncHandler(searchLinkController));

searchRouter.get("/logs", asyncHandler(getSearchLogController));

/** DELETE API */
searchRouter.delete("/logs", asyncHandler(deleteLogByKeywordController));

searchRouter.delete("/logs/all", asyncHandler(deleteAllSearchLogsController));