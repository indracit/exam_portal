import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.accessToken || req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
