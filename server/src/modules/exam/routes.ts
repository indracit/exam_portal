import { Router } from 'express';
import { createExam, createQuestion, enrollExam, submitAnswer, getQuestionsWithOptions, getAllExams } from './controller';
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


// GET /api/exam/:exam_id/questions (protected)
router.get('/:exam_id/questions', verifyAuth, getQuestionsWithOptions);

// GET /api/exam/all (protected)
router.get('/getallexams', verifyAuth, getAllExams);

export default router;
