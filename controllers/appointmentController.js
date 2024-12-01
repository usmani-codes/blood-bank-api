import mongoose from 'mongoose'
import Appointment from '../models/appointment.js'

// @desc Get all appointments
// @route GET /api/v1/appointments
const getAppointments = async (req, res, next) => {
    const appointments = await Appointment.find({}).populate({ path: "doner", populate: ["user", "blood", "bloodBank"] })

    if (!appointments.length) {
        return res.status(404).json({ success: false, msg: 'no appointments found' })
    }

    return res.json({ success: true, data: appointments })
}

// @desc Get appointment by id
// @route GET /api/v1/appointments/:id
const getAppointment = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid Appointment id.." })
    }

    const appointment = await Appointment.findOne({ _id: id }).populate({ path: "doner", populate: ["user", "blood", "bloodBank"] })

    if (!appointment) {
        return res.status(404).json({ success: false, msg: 'no Appointment found with this id' })
    }

    return res.json({ success: true, data: appointment })
}

// @desc Create a new Appointment
// @route POST /api/v1/appointments
const createAppointment = async (req, res, next) => {
    const { doner, appointmentDate } = req.body

    if (!doner || !appointmentDate) {
        return res.status(404).json({ success: false, msg: 'please fill all required fields ..' })
    }

    if (!mongoose.isValidObjectId(doner)) {
        return res.status(400).json({ success: false, msg: 'not a valid doner id ..' })
    }

    //find the same user with today's appointment
    const appointment = await Appointment.findOne({ doner, appointmentDate })

    //single appointment in a day
    if (appointment && JSON.stringify(appointmentDate) === JSON.stringify(appointment.appointmentDate)) {
        return res.status(404).json({ success: false, msg: `already have an appointment` })
    }

    const newAppointment = new Appointment({ doner, appointmentDate }).populate({ path: "doner", populate: ["user", "blood", "bloodBank"] })
    await newAppointment.save()

    if (!newAppointment) {
        res.status(404).json({ success: false, msg: 'the Appointment cannot be created!' })
    }

    res.status(200).json({ success: true, data: newAppointment })
}


// @desc update a Appointment by id
// @route PUT /api/v1/appointments/:id
const updateAppointment = async (req, res, next) => {
    const { id } = req.params
    const { doner, appointmentDate } = req.body

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid Appointment id.." })
    }

    if (doner) {
        return res.status(401).json({ success: false, msg: "you can't change your id.." })
    }

    const appointment = await Appointment.findOneAndUpdate({ _id: id }, { appointmentDate }, { new: true }).populate({ path: "doner", populate: ["user", "blood", "bloodBank"] })

    if (!appointment) {
        return res.status(404).json({ success: false, msg: 'appointment with this id not found' })
    }

    res.status(201).json({ success: true, msg: 'appointment updated ', data: appointment })
}

// @desc delete a appointment by id
// @route DELETE /api/v1/appointments/:id
const deleteAppointment = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid Id" })
    }

    const appointment = await Appointment.findOneAndDelete({ _id: id }).populate({ path: "doner", populate: ["user", "blood", "bloodBank"] })

    if (!appointment) {
        return res.status(404).json({ success: false, msg: `appointment type could not deleted ..` })
    }

    res.status(203).json({ success: true, msg: `appointment deleted`, appointment })
}

// @desc get appointments total count
// @route GET /api/v1/appointments/get/count
const getAppointmentsCount = async (req, res, next) => {
    const appointments = await Appointment.countDocuments()
    res.status(200).json({ success: true, totalappointments: appointments })
}

export { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment, getAppointmentsCount }