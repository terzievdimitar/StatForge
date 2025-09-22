import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.ts';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
