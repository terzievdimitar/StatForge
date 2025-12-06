import jwt from 'jsonwebtoken';
import User from '../models/user.model.ts';
import type { Request, Response, RequestHandler } from 'express';
import { redis } from '../lib/redis.ts';

const generateToken = (userId: string) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
	return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId: string, refreshToken: string) => {
	// Store in redis or database
	await redis.set(`refreshToken:${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60); // 7 days expiration
};

const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
	res.cookie('accessToken', accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: true,
		sameSite: 'none', // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

export const signup: RequestHandler = async (req: Request, res: Response) => {
	const { name, email, password } = req.body as { name: string; email: string; password: string };
	console.log('Signup request body:', req.body);

	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const user = await User.create({ name, email, password });

		// authenticate user
		const { accessToken, refreshToken } = generateToken(user._id.toString());
		await storeRefreshToken(user._id.toString(), refreshToken);
		setCookies(res, accessToken, refreshToken);

		res.status(201).json({
			_id: user._id,
			email: user.email,
			name: user.name,
		});
	} catch (error) {
		console.log('Error during signup:', error);
		res.status(500).json({ message: 'Server error', error });
	}
};

export const login: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body as { email: string; password: string };

		const user = await User.findOne({ email });

		console.log('Login attempt for email:', email, password, user);

		if (user && (await user.comparePassword(password))) {
			const { accessToken, refreshToken } = generateToken(user._id.toString());
			await storeRefreshToken(user._id.toString(), refreshToken);
			setCookies(res, accessToken, refreshToken);

			return res.status(200).json({
				_id: user._id,
				email: user.email,
				name: user.name,
			});
		} else {
			console.log('Login attempt for email:', email, password, user);
			res.status(400).json({ message: 'Invalid email or password' });
		}
	} catch (error) {
		console.log('Error during login:', error);
		res.status(500).json({ message: 'Server error', error });
	}
};

export const logout: RequestHandler = async (req: Request, res: Response) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
			await redis.del(`refreshToken:${(decoded as any).userId}`);
		}

		res.clearCookie('accessToken');
		res.clearCookie('refreshToken');
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		console.log('Error during logout:', error);
		res.status(500).json({ message: 'Server error', error });
	}
};

export const deleteAccount: RequestHandler = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;

		if (!userId) {
			return res.status(400).json({ message: 'User ID not provided' });
		}

		// remove refresh token from redis if present
		try {
			await redis.del(`refreshToken:${userId}`);
		} catch (redisErr) {
			console.warn('Failed to remove refresh token from redis:', redisErr);
		}

		// delete user record
		await User.findByIdAndDelete(userId);

		// Clear cookies (ensure proper flags if necessary)
		res.clearCookie('accessToken');
		res.clearCookie('refreshToken');

		res.status(200).json({ message: 'Account deleted successfully' });
	} catch (error) {
		console.log('Error deleting account:', error);
		res.status(500).json({ message: 'Server error', error });
	}
};

// Update Email
export const updateEmail: RequestHandler = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		const { newEmail } = req.body as { newEmail: string };

		if (!userId) {
			return res.status(400).json({ message: 'User ID not provided' });
		}
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		user.email = newEmail;
		await user.save();

		res.status(200).json({ message: 'Email updated successfully', email: user.email });
	} catch (error) {
		console.log('Error updating email:', error);
		res.status(500).json({ message: 'Server error', error });
	}
};

// refresh the access token
export const refreshToken: RequestHandler = async (req: Request, res: Response) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: 'No refresh token provided' });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string };
		const storedToken = await redis.get(`refreshToken:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(403).json({ message: 'Invalid refresh token' });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 15 * 60 * 1000, // 15 minutes
		});

		res.status(200).json({ message: 'Access token refreshed' });
	} catch (error) {
		console.log('Error during token refresh:', error);
		res.status(500).json({ message: 'Server error', error });
	}
};

export const getUserProfile: RequestHandler = async (req: Request, res: Response) => {
	try {
		res.json(req.user);
	} catch (error) {
		console.log('Error getting user profile:', error);
		res.status(500).json({ message: 'Server error', error });
	}
};
