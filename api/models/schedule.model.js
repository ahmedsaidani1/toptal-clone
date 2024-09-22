import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  developer: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

export default mongoose.model('Schedule', ScheduleSchema);
