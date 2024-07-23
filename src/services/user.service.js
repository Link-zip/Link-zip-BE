import { userResponseDTO } from '@dtos/user.dto.js';
import { addUserDao, getUserDao } from '@models/user.dao.js';

/** 사용자 회원가입 서비스 */
export const addUserSer = async (body) => {
    const kakaoId = 1234567890;
    
    // id 리턴
    const joinUserId = await addUserDao({
        "kakaoId": kakaoId,
        "nickname": body.nickname,
    });
    return userResponseDTO(await getUserDao(joinUserId));
};
