import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		if (!process.env.MONGO_URI || process.env.MONGO_URI.trim() === '') {
			console.error('Missing MONGO_URI. Did you load your .env?');
			process.exit(1);
		}
		const connection = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected to database: ${connection.connection.db?.databaseName ?? 'No Connection'}`);
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1);
	}
};
