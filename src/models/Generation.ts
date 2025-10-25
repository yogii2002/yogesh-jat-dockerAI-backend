import mongoose, { Document, Schema } from 'mongoose';

export interface IGeneration extends Document {
  githubUrl: string;
  githubToken: string;
  techStack: string[];
  dockerfile: string;
  buildStatus: 'pending' | 'building' | 'success' | 'error';
  imageId?: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GenerationSchema = new Schema<IGeneration>({
  githubUrl: {
    type: String,
    required: true,
    trim: true
  },
  githubToken: {
    type: String,
    required: true,
    trim: true
  },
  techStack: [{
    type: String,
    trim: true
  }],
  dockerfile: {
    type: String,
    default: ''
  },
  buildStatus: {
    type: String,
    enum: ['pending', 'building', 'success', 'error'],
    default: 'pending'
  },
  imageId: {
    type: String,
    trim: true
  },
  error: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
GenerationSchema.index({ githubUrl: 1, createdAt: -1 });

export const Generation = mongoose.model<IGeneration>('Generation', GenerationSchema);
