import type { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
	// TODO: Implement authentication logic
	const { username, password } = req.body;
	// Placeholder response
	res.status(200).json({ message: 'Login route hit', username });
};

export const signup = async (req: Request, res: Response) => {

    try {
        const {email, password, userType } = req.body;
        // Check if user already exists
        // Hash password
        // Save user to database
        // Return success response
                
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }

    res.status(200).json({ message: 'Signup route hit' });
}
