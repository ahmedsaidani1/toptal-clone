import mongoose from 'mongoose';

const hireSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  skillset: {
    type: [String],
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Hire', hireSchema);
