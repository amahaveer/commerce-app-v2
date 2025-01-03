import mongoose, { Schema } from 'mongoose';
import { eCollectionNames } from '../types/common.types';

const { Types } = Schema;

const TeamMemberSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  user: { 
    type: Types.ObjectId,
    ref: eCollectionNames.USER,
    required: true,
  },
  team: { 
    type: Types.ObjectId,
    ref: eCollectionNames.TEAMS,
    required: true,
  },
  organization: {
    type: Types.ObjectId,
    ref: eCollectionNames.ORGANIZATIONS,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model(eCollectionNames.MEMBER, TeamMemberSchema);