import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.ts';
import authRoutes from './routes/auth.route.ts';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import githubRoutes from './routes/github.routes.ts';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
	cors({
		origin: 'https://statforge.dimitarterziev.com', // Frontend URL
		credentials: true, // Allow cookies
	})
);

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Health check endpoint to keep the backend awake on render.com
app.use('/api/health', (req, res) => {
	res.status(200).send({ success: true });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/github', githubRoutes);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
