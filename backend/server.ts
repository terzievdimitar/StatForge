import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.ts';
import authRoutes from './routes/auth.route.ts';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));

app.use('/api/auth', authRoutes);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
