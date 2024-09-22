import express from 'express';
import { createSchedule, getAppointments , deleteAppointment }  from '../controllers/schedule.controller.js';

const router = express.Router();

router.post('/schedule', createSchedule);
router.get('/appointments', getAppointments);
router.delete('/appointments/:id', deleteAppointment);

export default router;
