import { refreshTokens } from '../../shared/utils/jwt';
import type { Request, Response } from 'express';
import { query } from '../../shared/db/db';
import crypto from 'crypto';
import { generateAccessToken, generateRefreshToken } from '../../shared/utils/jwt';


export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        console.log(`[LOGIN] Attempt for username: ${username}`);

        // Hash password using crypto (no salt)
        const hash = crypto.createHash('sha512').update(password).digest('hex');

        // Select user from DB where name and password_hash match
        const users = await query(
            'SELECT name, role, password_hash FROM users WHERE name = ? AND password_hash = ?',
            [username, hash]
        );

        if (!Array.isArray(users) || users.length === 0) {
            console.warn(`[LOGIN] Invalid credentials for username: ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = (users as any[])[0];
        console.log(`[LOGIN] Successful login for username: ${user.name}, role: ${user.role}`);

        // Generate JWT access and refresh tokens using shared util
        const accessToken = generateAccessToken({ name: user.name, role: user.role });
        const refreshToken = generateRefreshToken({ name: user.name, role: user.role });

        // Send tokens in cookies
        // res.cookie('accessToken', accessToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 15 * 60 * 1000,
        //     sameSite: 'strict',
        // });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        });

    res.status(200).json({ name: user.name, role: user.role, accessToken });
    } catch (error) {
        console.error('[LOGIN] Internal server error:', error);
        res.status(500).json({ message: 'internal server error' });
    }
};

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role } = req.body;
        console.log(`[SIGNUP] Attempt for username: ${username}, email: ${email}`);

        // Check if user already exists (by username or email)
        const existingUsers = await query(
            'SELECT * FROM users WHERE name = ? OR email = ?',
            [username, email]
        );

        if (Array.isArray(existingUsers) && existingUsers.length > 0) {
            console.warn(`[SIGNUP] Duplicate user detected: username=${username}, email=${email}`);
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password using crypto (no salt)
        const hash = crypto.createHash('sha512').update(password).digest('hex');

        // Save user to database (username, email, hash, role)
        await query(
            'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [username, email, hash, role]
        );
        console.log(`[SIGNUP] User created: username=${username}, email=${email}, role=${role}`);

        // Prepare user details for response and JWT
        const user = { username, email, role };

        // Generate JWT access and refresh tokens using shared util
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Send tokens in cookies
        // res.cookie('accessToken', accessToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 15 * 60 * 1000,
        //     sameSite: 'strict',
        // });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        });

    console.log(`[SIGNUP] Tokens issued for username=${username}`);
    res.status(201).json({ message: 'Signup successful', user, accessToken });
    } catch (error) {
        console.error('[SIGNUP] Internal server error:', error);
        res.status(500).json({ message: 'internal server error' });
    }}

    export const refresh = (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }
        const tokens = refreshTokens(refreshToken);
        if (!tokens) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
        // res.cookie('accessToken', tokens.accessToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 15 * 60 * 1000,
        //     sameSite: 'strict',
        // });
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        });
    res.status(200).json({ message: 'Tokens refreshed', user: tokens.user, accessToken: tokens.accessToken });
    } catch (error) {
        console.error('[REFRESH] Internal server error:', error);
        res.status(500).json({ message: 'internal server error' });
    }
};