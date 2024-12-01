import mongoose, { mongo } from "mongoose";
import BloodStock from "../models/bloodStock.js";

// @desc Get all bloodStocks
// @route GET /api/v1/blood-stocks
const getBloodStocks = async (req, res, next) => {
    const bloodStocks = await BloodStock.find({}).populate(['bloodBank', 'blood'])

    if (!bloodStocks.length) {
        return res.status(404).json({ success: false, msg: 'no bloodStocks found' })
    }

    return res.json({ success: true, data: bloodStocks })
}

// @desc get a single bloodStock
// @route GET /api/v1/blood-stocks/:id
const getBloodStock = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: 'invalid Id ' })
    }
    const bloodStock = await BloodStock.findOne({ _id: id }).populate(['bloodBank', 'blood'])

    if (!bloodStock) {
        return res.status(404).json({ success: false, msg: 'no blood Stock found with this id' })
    }

    return res.json({ success: true, data: bloodStock })
}


// @desc Create a bloodStock
// @route POST /api/v1/blood-stocks
const createBloodStock = async (req, res, next) => {
    const { bloodBank, blood, quantity, expiryDate } = req.body

    if (!mongoose.isValidObjectId(blood) || !mongoose.isValidObjectId(bloodBank)) {
        return res.status(400).json({ success: false, msg: "must be a vlid hospital id.." })
    }

    if (!bloodBank || !blood || !quantity || !expiryDate) {
        return res.status(400).json({ success: false, msg: "please provide all required fields.." })
    }

    const newBloodStock = new BloodStock({ bloodBank, blood, quantity, expiryDate })
    await newBloodStock.save()

    if (!newBloodStock) {
        return res.status(500).json({ success: false, msg: "blood Stock couldn't created .." })
    }

    res.status(201).json({ msg: 'blood Stock submitted!!', data: newBloodStock })
}


// @desc update a bloodStock
// @route PUT /api/v1/blood-stocks
const updateBloodStock = async (req, res, next) => {
    const { id } = req.params
    const { bloodBank, blood, quantity, expiryDate } = req.body

    if (!mongoose.isValidObjectId(hospital)) {
        return res.status(400).json({ success: false, msg: "must be a vlid hospital id.." })
    }

    const bloodStock = await BloodStock.findOneAndUpdate({ _id: id }, { bloodBank, blood, quantity, expiryDate }, { new: true })

    if (!bloodStock) {
        return res.status(404).json({ success: false, msg: 'blood Stock with this id not found' })
    }

    res.status(201).json({ msg: 'blood Stock updated ', data: bloodStock })
}

// @desc delete a blood Stock by id
// @route DELETE /api/v1/blood-stocks/:id
const deleteBloodStock = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid Id" })
    }

    let bloodStock = await BloodStock.findOneAndDelete({ _id: id })

    if (!bloodStock) {
        return res.status(404).json({ success: true, msg: `blood Stock not found` })
    }

    res.status(200).json({ success: true, msg: `blood Stock deleted`, bloodStock })
}

// @desc get  total bloodStocks count
// @route GET /api/v1/blood-stocks/get/count
const getBloodStocksCount = async (req, res, next) => {
    const bloodStocks = await BloodStock.countDocuments()
    res.status(200).json({ success: true, totalbloodStocks: bloodStocks })
}

export { getBloodStocks, getBloodStock, createBloodStock, updateBloodStock, deleteBloodStock, getBloodStocksCount }