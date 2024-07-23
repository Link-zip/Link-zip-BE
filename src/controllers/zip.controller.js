import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { createZipReqDto, deleteZipReqDto } from "../dtos/zip.dto.js";
import { createZipService, deleteZipService } from "../services/zip.service.js";

// POST Controller
/** Zip 생성 controller */
export const createZipController = async(req, res, next) => {
    return res.send(response(status.SUCCESS, await createZipService(createZipReqDto(req.body))));
};


// DELETE Controller
/** Zip 삭제 controller */
export const deleteZipController = async(req, res, next) => {
    return res.send(response(status.SUCCESS, await deleteZipService(deleteZipReqDto(req.body))));
};