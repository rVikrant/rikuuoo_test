import {Document, Schema, model} from 'mongoose';

// local
import { SET_NAME, ENV_CONFIG } from '../config';

const {ACTIVE, INACTIVE} = ENV_CONFIG.DATABASE.TYPE.STATUS;

export interface IUser extends Document {
    lastName: string,
    firstName: string,
    createdAt: number,
    userGroupId: string | null,
    lastLoggedIn: number,
};


const UserSchema = new Schema({
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    userGroupId: {type: Schema.Types.ObjectId, ref: SET_NAME.GROUP, index: true},
    lastLoggedIn: {type: Number, required: true},

    status: { type: String, enum: [ACTIVE, INACTIVE], default: ACTIVE },
    createdAt: { type: Number, default: Date.now() },
});

export let users = model<IUser>(SET_NAME.USER, UserSchema);