import jwt from 'jsonwebtoken';
import { status } from './response.status.js';
import { BaseError } from './error.js';

/** 토큰 검증 미들웨어, req.userId 반환 */
export const tokenAuthMiddleware = (req, res, next) => {
    const header = req.headers['authorization'] || req.headers['Authorization'];
    if (!header) {
        throw new BaseError(status.TOKEN_INVALID);
    }
    let token = header;
    if (header.startsWith('Bearer ')) {
        token = header.split('Bearer ')[1];
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                throw new BaseError(status.TOKEN_EXPIRED);
            } else {
                throw new BaseError(status.UNAUTHORIZED);
            }
        }
        req.userId = decoded.userId;
        next();
    })
}