import { status } from "@config/response.status";
import { BaseError } from "@config/error";
import { userResponseDTO } from "@dtos/user.dto";
import { getUserDao } from "@models/user.dao";

/** 사용자 정보 조회 서비스 */
export const getUserSer = async (req) => {
    const userId = req.userId;
    const result = await getUserDao(userId);

    if (result === undefined) {
        throw new BaseError(status.USER_NOT_FOUND);
    }

    return userResponseDTO(await getUserDao(userId));
}