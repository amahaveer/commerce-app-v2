import mongoose, { Schema } from 'mongoose';
import { eCollectionNames, eRoles } from '../types/common.types';

const { Types } = Schema;

const TeamsSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  organization: {
    type: Types.ObjectId,
    ref: eCollectionNames.ORGANIZATIONS,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(eRoles),
    default: eRoles.CUSTOM
  },
  permission: {
    type: Types.ObjectId,
    ref: eCollectionNames.PERMISSIONS
  }
}, { timestamps: true });

export default mongoose.model(eCollectionNames.TEAMS, TeamsSchema);