import express from 'express'

import { getAppointments, getAppointment, updateAppointment, deleteAppointment, getAppointmentsCount, createAppointment } from '../controllers/appointmentController.js'

const router = express.Router()

//get all appointments
router.get('/', getAppointments)

//get single Appointment
router.get('/:id', getAppointment)

//create an appointment
router.post('/', createAppointment)

//update an appointment
router.put('/:id', updateAppointment)

//delete an appointment
router.delete('/:id', deleteAppointment)

//get appointmets count
router.get('/get/count', getAppointmentsCount)

export default router