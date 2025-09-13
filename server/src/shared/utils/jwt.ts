
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';

export function generateAccessToken(payload: object) {
    return   jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

export  function generateRefreshToken(payload: object) {
    return  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}


export function refreshTokens(refreshToken: string) {
    try {
        const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        // Remove iat, exp from payload for new tokens
        const { iat, exp, ...userPayload } = payload as any;
        const newAccessToken = generateAccessToken(userPayload);
        const newRefreshToken = generateRefreshToken(userPayload);
        return { accessToken: newAccessToken, refreshToken: newRefreshToken, user: userPayload };
    } catch (err) {
        console.error('Error refreshing tokens:', err);
        return null;
    }
}
