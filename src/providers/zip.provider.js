import { getZipsDao } from "@models/zip.dao.js"
import { getZipResDto } from "@dtos/zip.dto.js";

export const getZipsProvider = async (req) => {
    return (await getZipsDao(req.query.sort, req.body.user_id)).map((zip) => getZipResDto(zip));
}