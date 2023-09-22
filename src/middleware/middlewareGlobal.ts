import { Request, Response, NextFunction } from 'express';

export function middlewareGlobal(
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log('Middleware Global passou aqui!');
	console.log('------------------------------');
	next();
}
