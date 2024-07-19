import { userResponseDTO } from '@dtos/user.dto.js';
import { addUserDao, getUserDao } from '@models/user.dao.js';

export const addUserSer = async (body) => {
    const kakaoId = 1234567890;
    
    // id 리턴
    const joinUserData = await addUserDao({
        "kakaoId": kakaoId,
        "nickname": body.nickname,
    });
    console.log("joinUserData", joinUserData);
    return userResponseDTO(await getUserDao(joinUserData));
};
