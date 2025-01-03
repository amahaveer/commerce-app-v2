import mongoose, { Collection, Schema } from 'mongoose';
import { eCollectionNames, eModulesName } from '../types/common.types';

const { Types } = Schema;

const PermissionSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  [eModulesName.PRODUCTS]: { 
    type: Array, 
  },
  [eModulesName.ORDERS]: { 
    type: Array, 
  },
  [eModulesName.CUSTOMERS]: { 
    type: Array, 
  },
  organization: {
    type: Types.ObjectId,
    ref: eCollectionNames.ORGANIZATIONS
  },
  project: {
    type: Types.ObjectId,
    ref: eCollectionNames.PROJECTS
  }
}, { timestamps: true });

export default mongoose.model(eCollectionNames.PERMISSIONS, PermissionSchema);