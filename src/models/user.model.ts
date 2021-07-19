import {Document, Schema, Model, model} from 'mongoose';


const UserSchema = new Schema({
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    createdAt: { type: Number, default: Date.now() },
});

const User = model('User', UserSchema);

export { User } ;