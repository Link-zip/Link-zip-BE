// src/routes/list.route.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import { getLinksCnt, createNewLinkCnt, getSummaryCnt, updateVisitCnt, updateLikeCnt, updateZipIdCnt, deleteLinkByIdCnt, getLinkByIdCnt, extractUrlCnt, modifyLinkCnt } from '@controllers/link.controller';
//controller

export const linkRouter = express.Router();


/** GET API */
linkRouter.get("/get_links/:zip_id", asyncHandler(getLinksCnt));
linkRouter.get("/get_link/:link_id", asyncHandler(getLinkByIdCnt));



/** POST API */
linkRouter.post('/summary', asyncHandler(getSummaryCnt)); // 텍스트 요약(url전송)
linkRouter.post('/add', asyncHandler(createNewLinkCnt)); 
linkRouter.post('/extract', asyncHandler(extractUrlCnt));

/** PATCH API */
linkRouter.patch('/visit/:link_id', asyncHandler(updateVisitCnt));
linkRouter.patch('/update_like/:link_id', asyncHandler(updateLikeCnt));
linkRouter.patch('/move/:link_id/:new_zip_id', asyncHandler(updateZipIdCnt));
linkRouter.patch('/modify/:link_id', asyncHandler(modifyLinkCnt));

/** DELETE API */
linkRouter.delete('/delete/:link_id', asyncHandler(deleteLinkByIdCnt));