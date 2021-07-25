import {Document, Schema, model} from 'mongoose';

// local
import { SET_NAME, GROUP, ENV_CONFIG } from '../config';

const {ACTIVE, INACTIVE} = ENV_CONFIG.DATABASE.TYPE.STATUS;
const Groups = [GROUP.FAN, GROUP.ADMIN, GROUP.SUPER_ADMIN, GROUP.CREATOR];

export interface IGroup extends Document {
    name: string,
    createdAt: number
};


const GroupSchema = new Schema({
    name: {type: String, enum: Groups, required: true},

    status: { type: String, enum: [ACTIVE, INACTIVE], default: ACTIVE },
    createdAt: { type: Number, default: Date.now() },
});

export let groupes = model<IGroup>(SET_NAME.GROUP, GroupSchema);