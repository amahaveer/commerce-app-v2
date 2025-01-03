import mongoose, { Schema } from 'mongoose';
import { eCollectionNames } from '../types/common.types';

const { Types } = Schema;

const UserSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    unique: true 
  },
  password: { 
    type: String, 
    required: true,
  },
}, { timestamps: true });

export default mongoose.model(eCollectionNames.USER, UserSchema);