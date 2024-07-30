import { userResponseDTO } from "@dtos/user.dto";
import { getUserDao } from "@models/user.dao";

/** 사용자 정보 조회 서비스 */
export const getUserSer = async (req) => {
    const userId = req.userId;
    return userResponseDTO(await getUserDao(userId));
}

export const checkNicknameSer = async (body) => {
    return {
        isExist: false,
    }
}