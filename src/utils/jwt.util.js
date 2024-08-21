import { BaseError } from '@config/error';
import { status } from '@config/response.status';
import { deleteRefreshTokenCache, getRefreshTokenCache, setRefreshTokenCache } from '@providers/user.provider';
import { generateToken } from '@services/user.service';
import jwt from 'jsonwebtoken';

export const refresh = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const cachedRefreshToken = await getRefreshTokenCache(decoded.userId);

        if (refreshToken !== cachedRefreshToken) {
            throw new BaseError(status.TOKEN_INVALID)
        }

        await deleteRefreshTokenCache(decoded.userId);

        const payload = {
            userId: decoded.userId,
            nickname: decoded.nickname,
            kakaoId: decoded.kakaoId,
        };
        const tokenResponse = await generateToken(payload);
        await setRefreshTokenCache(decoded.userId, tokenResponse.refreshToken);
        return tokenResponse;
    } catch (error) {
        throw new BaseError(status.UNAUTHORIZED);
    }
}