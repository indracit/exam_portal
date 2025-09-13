import { Router } from 'express';
import { createExam, createQuestion, enrollExam, submitAnswer } from './controller';
import { verifyAuth } from '../../shared/middleware/auth';

const router = Router();


// POST /api/exam/createExam (protected)
router.post('/createExam', verifyAuth, createExam);


// POST /api/exam/createQuestion (protected)
router.post('/createQuestion', verifyAuth, createQuestion);


// POST /api/exam/enrollExam (protected)
router.post('/enrollExam', verifyAuth, enrollExam);

// POST /api/exam/submitAnswer (protected)
router.post('/submitAnswer', verifyAuth, submitAnswer);

export default router;
