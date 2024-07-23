import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { createZipDao, deleteZipDao, testZipDeletableDao } from "../models/zip.dao.js";
import { createZipResDto, deleteZipResDto } from "../dtos/zip.dto.js";

// POST API
/** Zip 생성 service */
export const createZipService = async (dto) => {
    return createZipResDto(await createZipDao(dto));
};

// DELETE API
/** Zip 삭제 service */
export const deleteZipService = async (dto) => {
    dto = await testZipDeletableDao(dto);
    if(dto.status == 'default'){
        throw new BaseError(status.BAD_REQUEST);
    };
    return deleteZipResDto(await deleteZipDao(dto));
};