import mongoose, { Schema } from 'mongoose';
import { eCollectionNames } from '../types/common.types';

const { Types } = Schema;

const OrganizationSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  name: { 
    type: String, 
    required: true,
    unique: true,
  },
}, { timestamps: true });

export default mongoose.model(eCollectionNames.ORGANIZATIONS, OrganizationSchema);