import mongoose, { mongo } from "mongoose";
import BloodBank from "../models/bloodBank.js";
import Hospital from "../models/hospital.js";

// @desc Get all bloodBanks
// @route GET /api/v1/bloodBanks
const getBloodBanks = async (req, res, next) => {
    const bloodBanks = await BloodBank.find({}).populate('hospital', "name city country")

    if (!bloodBanks.length) {
        return res.status(404).json({ success: false, Doner: 'no bloodBanks found' })
    }

    return res.json({ success: true, data: bloodBanks })
}

// @desc get a single blood bank
// @route GET /api/v1/blood-banks/:id
const getBloodBank = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, Doner: 'invalid Id ' })
    }
    const bloodBank = await BloodBank.findOne({ _id: id }).populate("hospital")

    if (!bloodBank) {
        return res.status(404).json({ success: false, Doner: 'no blood Bank found with this id' })
    }

    return res.json({ success: true, data: bloodBank })
}


// @desc Create a blood bank
// @route POST /api/v1/blood-banks
const createBloodBank = async (req, res, next) => {
    const { name, hospital, phone } = req.body

    if (!mongoose.isValidObjectId(hospital)) {
        return res.status(400).json({ success: false, msg: "must be a vlid hospital id.." })
    }

    if (!name || !hospital || !phone) {
        return res.status(400).json({ success: false, msg: "please provide all required fields.." })
    }

    //hospital in blood Banks
    const bloodBank = await BloodBank.findOne({ hospital: hospital })

    //hospital already has a blood bank
    if (bloodBank) {
        return res.status(401).json({ success: false, Doner: 'hospital cannot have multiple blood bank!' })
    }


    const newBloodBank = new BloodBank({ name, hospital, phone })
    await newBloodBank.save()

    if (!newBloodBank) {
        return res.status(500).json({ success: false, msg: "blood Bank couldn't created .." })
    }

    res.status(201).json({ msg: 'blood Bank submitted!!', data: newBloodBank })
}


// @desc update a blood bank
// @route PUT /api/v1/blood-banks
const updateBloodBank = async (req, res, next) => {
    const { id } = req.params
    const { name, hospital, phone } = req.body

    if (!mongoose.isValidObjectId(hospital)) {
        return res.status(400).json({ success: false, msg: "must be a vlid hospital id.." })
    }

    const bloodBank = await BloodBank.findOneAndUpdate({ _id: id }, { name, hospital, phone }, { new: true })

    if (!bloodBank) {
        return res.status(404).json({ success: false, msg: 'blood Bank with this id not found' })
    }

    res.status(201).json({ msg: 'blood Bank updated ', data: bloodBank })
}

// @desc delete a blood bank by id
// @route DELETE /api/v1/blood-banks/:id
const deleteBloodBank = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid Id" })
    }

    let bloodBank = await BloodBank.findOneAndDelete({ _id: id })

    if (!bloodBank) {
        console.log("blood Bank not found..")
        return res.status(404).json({ success: true, Doner: `blood Bank not found` })
    }

    res.status(200).json({ success: true, Doner: `blood Bank deleted`, bloodBank })
}

// @desc get  total bloodBanks count
// @route GET /api/v1/blood-banks/get/count
const getBloodBanksCount = async (req, res, next) => {
    const bloodBanks = await BloodBank.countDocuments()
    res.status(200).json({ success: true, totalbloodBanks: bloodBanks })
}

export { getBloodBanks, getBloodBank, createBloodBank, updateBloodBank, deleteBloodBank, getBloodBanksCount }