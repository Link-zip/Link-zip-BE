import express from 'express';
import asyncHandler from 'express-async-handler';
import {
    createZipController,
    deleteZipController
} from '@controllers/zip.controller.js';


export const zipRouter = express.Router();

/** POST API */
zipRouter.post("/", asyncHandler(createZipController));

/** DELETE API */
zipRouter.delete("/", asyncHandler(deleteZipController));


