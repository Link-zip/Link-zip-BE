import { getZipsDao } from "@models/zip.dao.js"
import { getZipResDto } from "@dtos/zip.dto.js";

export const getZipsProvider = async (req) => {
    return {
      zips : ((await getZipsDao(req.query.sort, req.userId)).map((zip) => getZipResDto(zip)))
    };
}