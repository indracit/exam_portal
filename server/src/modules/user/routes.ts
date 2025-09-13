import { Router } from 'express';
import { login, signup, refresh } from './controller';

const router = Router();

// POST /api/auth/login
router.post('/login', login);
// POST /api/auth/signup
router.post('/signup', signup);
// POST /api/auth/refresh-token
router.post('/refresh-token', refresh);


export default router;
