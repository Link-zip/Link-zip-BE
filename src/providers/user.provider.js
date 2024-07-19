import { userResponseDTO } from "@dtos/user.dto";
import { getUserDao } from "@models/user.dao";

export const getUserSer = async (req) => {
    const userId = req.userId;
    return userResponseDTO(await getUserDao(userId));
}