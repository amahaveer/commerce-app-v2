import mongoose, { Schema } from 'mongoose';
import { eCollectionNames } from '../types/common.types';

const { Types } = Schema;

const ProjectSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  key: { 
    type: String, 
    required: true 
  },
  organization: {
    type: Types.ObjectId,
    ref: eCollectionNames.ORGANIZATIONS
  }
}, { timestamps: true });

ProjectSchema.pre("find", function(){
  this.populate("organization")
})

export default mongoose.model(eCollectionNames.PROJECTS, ProjectSchema);