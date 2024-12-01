import mongoose from "mongoose"
import Transfusion from "../models/transfusion.js"

// @desc Get all transfusionss
// @route GET /api/v1/transfusionss
const getTransfusions = async (req, res, next) => {
    const transfusionss = await Transfusion.find({}).populate("blood").populate({ path: "doner", populate: ["user", "blood", "bloodBank"] }).populate({ path: "recipient", populate: ["user", "blood", "bloodBank"] })

    if (!transfusionss.length) {
        return res.status(404).json({ success: false, msg: 'no transfusionss found' })
    }

    return res.json({ success: true, data: transfusionss })
}

// @desc Get transfusions by id
// @route GET /api/v1/transfusions/:id
const getTransfusion = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid transfusions id.." })
    }

    const transfusions = await Transfusion.findOne({ _id: id }).populate("blood").populate({ path: "doner", populate: ["user", "blood", "bloodBank"] }).populate({ path: "recipient", populate: ["user", "blood", "bloodBank"] })

    if (!transfusions) {
        return res.status(404).json({ success: false, msg: 'no transfusions found with this id' })
    }

    return res.json({ success: true, data: transfusions })
}

// @desc Create a new transfusions
// @route POST /api/v1/transfusions
const createTransfusion = async (req, res, next) => {
    const { doner, recipient, blood, transfusionDate, reaction } = req.body

    if (!mongoose.isValidObjectId(doner) || !mongoose.isValidObjectId(recipient) || !mongoose.isValidObjectId(blood)) {
        res.status(400).json({ success: false, msg: "invalid doner, recipient or blood id.." })
    }

    if (!recipient || !doner || !transfusionDate || !blood || !reaction) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields ..' })
    }

    const newtransfusions = new Transfusion({ doner, recipient, blood, transfusionDate, reaction }).populate("blood").populate({ path: "doner", populate: ["user", "blood", "bloodBank"] }).populate({ path: "recipient", populate: ["user", "blood", "bloodBank"] })

    await newtransfusions.save()

    if (!newtransfusions) {
        res.status(404).json({ success: false, msg: 'the transfusions cannot be created!' })
    }

    res.status(200).json({ success: true, msg: "transfusion created successfully ", data: newtransfusions })
}


// @desc update a transfusions by id
// @route PUT /api/v1/transfusionss/:id
const updateTransfusion = async (req, res, next) => {
    const { id } = req.params
    const { doner, recipient, blood, transfusionDate, reaction } = req.body

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid transfusion id.." })
    }

    const transfusions = await Transfusion.findOneAndUpdate({ _id: id }, { doner, recipient, blood, transfusionDate, reaction }, { new: true }).populate("blood").populate({ path: "doner", populate: ["user", "blood", "bloodBank"] }).populate({ path: "recipient", populate: ["user", "blood", "bloodBank"] })

    if (!transfusions) {
        return res.status(404).json({ success: false, msg: 'transfusions with this id not found' })
    }

    res.status(201).json({ msg: 'transfusion updated ', data: transfusions })
}

// @desc delete a transfusions by id
// @route DELETE /api/v1/transfusionss/:id
const deleteTransfusion = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid Id" })
    }

    const transfusion = await Transfusion.findOneAndDelete({ _id: id })

    if (!transfusion) {
        return res.status(404).json({ success: true, Doner: `transfusion type could not deleted ..` })
    }

    res.status(200).json({ success: true, Doner: `transfusion deleted`, transfusion })
}

// @desc get transfusionss total count
// @route GET /api/v1/transfusionss/get/count
const getTransfusionsCount = async (req, res, next) => {
    const transfusions = await Transfusion.countDocuments()
    res.status(200).json({ success: true, totaltransfusionss: transfusions })
}

export { getTransfusions, getTransfusion, createTransfusion, updateTransfusion, deleteTransfusion, getTransfusionsCount }