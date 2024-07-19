import { userResponseDTO } from '@dtos/user.dto.js';
import { addUserDao, getUserDao } from '@models/user.dao.js';

export const addUserSer = async (body) => {
    const kakaoId = "sampleKakaoId";
    
    // id 리턴
    const joinUserData = await addUserDao({
        "nickname": body.nickname,
        "kakaoId": kakaoId,
    });

    return userResponseDTO(await getUserDao(joinUserData));
};
