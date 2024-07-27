// src/routes/list.route.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import { getLinksCnt, createNewLinkCnt, getSummaryCnt, updateVisitCnt, updateLikeCnt, updateZipIdCnt, deleteLinkByIdCnt } from '@controllers/link.controller';
//controller

export const linkRouter = express.Router();


/** GET API */
// user_id는 token에서 받아오는걸로 수정할 예정
linkRouter.get("/get_links/:zip_id/:user_id", asyncHandler(getLinksCnt));



/** POST API */
linkRouter.post('/summary', asyncHandler(getSummaryCnt)); // 텍스트 요약(url전송)
linkRouter.post('/add', asyncHandler(createNewLinkCnt)); 


/** PATCH API */
linkRouter.patch('/visit/:link_id', asyncHandler(updateVisitCnt));
linkRouter.patch('/update_like/:link_id', asyncHandler(updateLikeCnt));
linkRouter.patch('/move/:link_id/:new_zip_id', asyncHandler(updateZipIdCnt));

/** DELETE API */
linkRouter.delete('/delete/:link_id', asyncHandler(deleteLinkByIdCnt));