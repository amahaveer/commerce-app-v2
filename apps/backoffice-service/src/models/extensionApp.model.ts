import mongoose, { Schema } from 'mongoose';
import { eCollectionNames } from '../types/common.types';

const { Types } = Schema;

const ExtensionAppSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  key: { 
    type: String, 
    required: true,
  },
  name: {
    type: String, 
    required: true,
  },
  organization: {
    type: Types.ObjectId,
    ref: eCollectionNames.ORGANIZATIONS
  },
  project: {
    type: Types.ObjectId,
    ref: eCollectionNames.PROJECTS
  },
  configuaration: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  }
}, { timestamps: true });

export default mongoose.model(eCollectionNames.EXTENSION_APP, ExtensionAppSchema);