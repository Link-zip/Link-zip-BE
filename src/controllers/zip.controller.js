import { response } from '@config/response.js';
import { status } from '@config/response.status.js';
import { createZipReqDto, deleteZipReqDto, editZipReqDto } from '@dtos/zip.dto.js';
import { createZipService, deleteZipService, editZipService } from '@services/zip.service.js';
import { getZipsProvider } from '@providers/zip.provider.js';

// POST Controller
/** Zip 생성 controller */
export const createZipController = async(req, res, next) => {
    return res.send(response(status.CREATED, await createZipService(createZipReqDto(req.userId, req.body))));
};


// DELETE Controller
/** Zip 삭제 controller */
export const deleteZipController = async(req, res, next) => {
    return res.send(response(status.DELETED, await deleteZipService(deleteZipReqDto(req.userId, req.params, req.query))));
};

// GET Controller
/** Zip 조회 controller */
export const getZipsController = async(req, res, next) => {
    return res.send(response(status.SUCCESS, await getZipsProvider(req)));
}

// PATCH Controller
/** Zip 수정 controller */
export const editZipController = async(req, res, next) => {
    return res.send(response(status.UPDATED, await editZipService(editZipReqDto(req.userId, req.body))));
}