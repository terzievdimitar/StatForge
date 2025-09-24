import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import User from '../models/user.model.ts';
import type { IUser } from '../models/user.model.ts';

// Extend Express Request interface to include 'user'
declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const accessToken = req.cookies?.accessToken;

		if (!accessToken) {
			return res.status(401).json({ message: 'No access token provided' });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
			const user = await User.findById((decoded as any).userId);
			if (!user) {
				return res.status(401).json({ message: 'User not found' });
			}
			req.user = user as IUser;
			next();
		} catch (error: any) {
			if (error.name === 'TokenExpiredError') {
				return res.status(401).json({ message: 'Access token expired' });
			}
			throw error;
		}
	} catch (error: any) {
		res.status(401).json({ message: 'Not authorized', error: error.message });
	}
};
