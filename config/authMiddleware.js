import jwt from 'jsonwebtoken';
import { status } from './response.status.js';
import { BaseError } from './error.js';

/** 토큰 검증 미들웨어, req.userId 반환 */
export const tokenAuthMiddleware = (req, res, next) => {
    const token = req.headers['authorization'] || req.headers['Authorization'];
    if (!token) {
        throw new BaseError(status.TOKEN_INVALID);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new BaseError(status.UNAUTHORIZED);
        }
        req.userId = decoded.userId;
        next();
    })
}