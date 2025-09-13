import type { Request, Response } from 'express';
import { query } from '../../shared/db/db';

export const createExam = async (req: Request, res: Response) => {
	try {
		const { title, description, created_by, duration_min } = req.body;

		// Check if exam title already exists
		const existingExams = await query(
			'SELECT * FROM exams WHERE title = ?',
			[title]
		);
		if (Array.isArray(existingExams) && existingExams.length > 0) {
			return res.status(409).json({ message: 'Title already exists' });
		}

		await query(
			'INSERT INTO exams (title, description, created_by, duration_min) VALUES (?, ?, ?, ?)',
			[title, description, created_by, duration_min]
		);
		res.status(201).json({ message: 'Exam created successfully' });
	} catch (error) {
		console.error('[EXAM] Error creating exam:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const createQuestion = async (req: Request, res: Response) => {
	try {
		const { exam_id, question_text, question_type, marks, options } = req.body;
		// Insert question
		const result: any = await query(
			'INSERT INTO questions (exam_id, question_text, question_type, marks) VALUES (?, ?, ?, ?)',
			[exam_id, question_text, question_type, marks]
		);

        // console.log(result);
        
		// Get inserted question id (for MySQL, result.insertId)
		const question_id = result.insertId;

		// Insert options if provided and is array
		if (Array.isArray(options) && options.length > 0) {
			for (const opt of options) {
				// opt: { option_text, is_correct }
				await query(
					'INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)',
					[question_id, opt.option_text, opt.is_correct]
				);
			}
		}

		res.status(201).json({ message: 'Question and options created successfully' });
	} catch (error) {
		console.error('[QUESTION] Error creating question:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};


export const enrollExam = async (req: Request, res: Response) => {
	try {
		const { exam_id, student_id } = req.body;
		await query(
			'INSERT INTO submissions (exam_id, student_id) VALUES (?, ?)',
			[exam_id, student_id]
		);
		res.status(201).json({ message: 'Student enrolled in exam successfully' });
	} catch (error) {
		console.error('[EXAM] Error enrolling student:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const submitAnswer = async (req: Request, res: Response) => {
	try {
		const { submission_id, question_id, selected_option_id, answer_text } = req.body;

		// Check if answer already submitted
		const existingAnswers = await query(
			'SELECT * FROM answers WHERE submission_id = ? AND question_id = ?',
			[submission_id, question_id]
		);
		if (Array.isArray(existingAnswers) && existingAnswers.length > 0) {
			return res.status(409).json({ message: 'Already submitted' });
		}

		await query(
			'INSERT INTO answers (submission_id, question_id, selected_option_id, answer_text) VALUES (?, ?, ?, ?)',
			[submission_id, question_id, selected_option_id, answer_text]
		);
		res.status(201).json({ message: 'Answer submitted successfully' });
	} catch (error) {
		console.error('[ANSWER] Error submitting answer:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};


export const getAllExams = async (req: Request, res: Response) => {
	try {
		const exams = await query('SELECT * FROM exams');
		res.status(200).json({ exams });
	} catch (error) {
		console.error('[EXAM] Error fetching exams:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const getQuestionsWithOptions = async (req: Request, res: Response) => {
	try {
		const { exam_id } = req.params;
		// Fetch questions for the exam
		const questions = await query(
			'SELECT * FROM questions WHERE exam_id = ?',
			[exam_id]
		);

		// Fetch options for all questions
		const questionIds = (questions as any[]).map(q => q.id);
		let options: any[] = [];
		if (questionIds.length > 0) {
            
			options  = await query(
				`SELECT * FROM options WHERE question_id IN (${questionIds.map(() => '?').join(',')})`,
				questionIds
			);
		}

		// Attach options to questions
		const questionsWithOptions = (questions as any[]).map(q => ({
			...q,
			options: (options as any[]).filter(opt => opt.question_id === q.id)
		}));

		res.status(200).json({ questions: questionsWithOptions });
	} catch (error) {
		console.error('[QUESTION] Error fetching questions:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};