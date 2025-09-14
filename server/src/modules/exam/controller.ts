
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
		const exams = await query('SELECT s.id as examid,title,description,duration_min,s.id as submissionid FROM exams e join submissions s on e.id = s.exam_id;');
		res.status(200).json({ exams });
	} catch (error) {
		console.error('[EXAM] Error fetching exams:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const getQuestionsWithOptions = async (req: Request, res: Response) => {
	try {
		const { exam_id } = req.params;
		const questionsWithOptions = await query(
			`SELECT 
				q.id AS questionId,
				q.question_text,
				q.question_type,
				JSON_ARRAYAGG(
					JSON_OBJECT(
						'optionId', o.id,
						'optionText', o.option_text
					)
				) AS options
			FROM questions q
			JOIN options o ON q.id = o.question_id
			WHERE q.exam_id = ?
			GROUP BY q.id, q.question_text, q.question_type`,
			[exam_id]
		);
		res.status(200).json({ questions: questionsWithOptions });
	} catch (error) {
		console.error('[QUESTION] Error fetching questions:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};


export const getAnsweredQuestions = async (req: Request, res: Response) => {
	try {
		const { exam_id, student_id } = req.params;
		const answeredQuestions = await query(
			`SELECT 
				q.id AS questionId,
				q.question_text,
				JSON_ARRAYAGG(
					JSON_OBJECT(
						'optionId', o.id,
						'optionText', o.option_text,
						'isCorrect', o.is_correct
					)
				) AS options,
				a.answer_text AS submittedAnswer
			FROM questions q
			JOIN options o ON q.id = o.question_id
			LEFT JOIN answers a ON q.id = a.question_id
			JOIN submissions s ON s.id = a.submission_id AND s.exam_id = q.exam_id
			WHERE q.exam_id = ? AND s.student_id = ?
			GROUP BY q.id, q.question_text, q.question_type, q.marks, a.selected_option_id, a.answer_text, a.is_correct`,
			[exam_id, student_id]
		);
		res.status(200).json({ questions: answeredQuestions });
	} catch (error) {
		console.error('[QUESTION] Error fetching answered questions:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};