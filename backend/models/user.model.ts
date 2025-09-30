import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-ts';

// Define an interface for the User document
export interface IUser extends mongoose.Document {
	_id: mongoose.Types.ObjectId;
	email: string;
	password: string;
	name: string;
	githubInstallationId?: string; // Add GitHub installation ID field
	comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		name: { type: String, required: true },
		githubInstallationId: { type: String }, // Add GitHub installation ID field
	},
	{ timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error: any) {
		next(error);
	}
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error: any) {
		throw new Error('Error comparing passwords');
	}
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
