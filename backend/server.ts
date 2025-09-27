import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.ts';
import authRoutes from './routes/auth.route.ts';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
	cors({
		origin: 'http://localhost:5173', // Frontend URL
		credentials: true, // Allow cookies
	})
);

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
