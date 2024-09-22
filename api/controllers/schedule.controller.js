import Schedule from '../models/schedule.model.js';
import { errorHandler } from '../utils/error.js';

// Create new schedule entry
export const createSchedule = async (req, res, next) => {
  const { developer, date } = req.body;

  try {
    const newSchedule = new Schedule({
      developer,
      date
    });

    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
}
export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Schedule.find();
    res.status(200).json(appointments);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const deleteAppointment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await Schedule.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return next(errorHandler(404, 'Appointment not found'));
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
