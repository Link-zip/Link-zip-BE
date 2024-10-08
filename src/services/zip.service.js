import { BaseError } from '@config/error.js';
import { status } from '@config/response.status.js';
import { createZipDao, deleteZipDao, testZipDeletableDao, editZipDao } from '@models/zip.dao.js';
import { createZipResDto, deleteZipResDto, editZipResDto } from '@dtos/zip.dto.js';

// POST API
/** Zip 생성 service */
export const createZipService = async (dto) => {
    return createZipResDto(await createZipDao(dto));
};

// DELETE API
/** Zip 삭제 service */
export const deleteZipService = async (dto) => {
    // 해당 zip이 default zip인지 검증
    const zip_status = await testZipDeletableDao(dto);
    if(zip_status === 'default'){
        throw new BaseError(status.DELETE_DEFAULT_ZIP);
    };
    return deleteZipResDto(await deleteZipDao(dto));
};

// PATCH API
/** Zip 수정 service */
export const editZipService = async (dto) => {
    // 해당 zip이 default zip인지 검증
    const zip_status = await testZipDeletableDao(dto);
    if(zip_status === 'default'){
        throw new BaseError(status.UPDATE_DEFAULT_ZIP);
    };
    return editZipResDto(await editZipDao(dto));
}