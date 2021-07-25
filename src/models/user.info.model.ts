import {Document, Schema, model} from 'mongoose';

// local
import { SET_NAME, ENV_CONFIG } from '../config';

const {ACTIVE, INACTIVE} = ENV_CONFIG.DATABASE.TYPE.STATUS;

export interface IUserInfo extends Document {
    userId: string | null,
    userGroupId: string | null,
    createdAt: number,
    lastLoggedIn: number,
};


const UserInfoSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: SET_NAME.USER, index: true},
    userGroupId: {type: Schema.Types.ObjectId, ref: SET_NAME.GROUP},
    lastLoggedIn: {type: Number, required: true},

    status: { type: String, enum: [ACTIVE, INACTIVE], default: ACTIVE },
    createdAt: { type: Number, default: Date.now() },
});

// under 1 group same user is not allowed multiple times
UserInfoSchema.index({userGroupId: 1, userId: 1}, {unique: true});

export let userInfoes = model<IUserInfo>(SET_NAME.USER_INFO, UserInfoSchema);