import type { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    console.log(`[REQUEST] ${req.method} ${req.originalUrl} - Body:`, req.body);

    // Capture response data
    const oldJson = res.json;
    res.json = function (data) {
        const duration = Date.now() - start;
        console.log(`[RESPONSE] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms - Response:`, data);
        return oldJson.call(this, data);
    };

    next();
}
