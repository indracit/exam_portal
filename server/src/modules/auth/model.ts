import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
	username: string;
	email: string;
	password: string;
    usertype: string;
}

const UserSchema: Schema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
    userType: {
        type: String,
		required: true,
    }
}, {
	timestamps: true,
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
