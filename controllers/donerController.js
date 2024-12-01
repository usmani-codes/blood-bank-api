import mongoose from 'mongoose'
import Doner from '../models/Doner.js'
import { User } from '../models/user.js'

// @desc Get all doners
// @route GET /api/v1/doners
const getDoners = async (req, res, next) => {
    const doners = await Doner.find({}).populate("user").populate("blood").populate("bloodBank")

    if (!doners.length) {
        return res.status(404).json({ success: false, msg: 'no doners found' })
    }

    return res.json({ success: true, data: doners })
}

// @desc Get doner by id
// @route GET /api/v1/doners/:id
const getDoner = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: 'not a valid doner id' })
    }

    const doner = await Doner.findOne({ _id: id }).populate("user").populate("blood").populate("bloodBank")

    if (!doner) {
        return res.status(404).json({ success: false, msg: 'no doner found with this id' })
    }

    return res.json({ success: true, data: doner })
}

// @desc update a doner by id
// @route PUT /api/v1/doners/:id
const updateDoner = async (req, res, next) => {
    const { id } = req.params
    const { blood, bloodBank, user } = req.body

    if (user) {
        return res.status(401).json({ success: false, msg: "you cant can't change your id" })
    }

    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(blood) || !mongoose.isValidObjectId(bloodBank)) {
        return res.status(401).json({ success: false, msg: 'not a valid db id..' })
    }

    const doner = await Doner.findOneAndUpdate({ _id: id }, { blood, bloodBank }, { new: true }).populate("user").populate("blood").populate("bloodBank")

    if (!doner) {
        return res.status(404).json({ success: false, msg: 'doner with this id not found' })
    }

    res.status(201).json({ success: true, msg: 'doner updated ', data: doner })
}

// @desc delete a doner by id
// @route DELETE /api/v1/doners/:id
const deleteDoner = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid doner Id.." })
    }

    //delete the user before deleting doner
    const donerUser = await Doner.findOne({ _id: id })

    if (!donerUser) {
        return res.status(404).json({ success: false, msg: `user not found` })
    }

    console.log('deleting user with id: ', donerUser.user)
    await User.findOneAndDelete({ _id: donerUser.user })


    console.log("deleting doner ..")
    const doner = await Doner.findOneAndDelete({ _id: id })

    if (!doner) {
        return res.status(404).json({ success: false, msg: `doner not found` })
    }

    res.status(203).json({ success: true, msg: `doner deleted`, doner })
}

// @desc get doners total count
// @route GET /api/v1/doners/get/count
const getDonersCount = async (req, res, next) => {
    const doners = await Doner.countDocuments()
    res.status(200).json({ success: true, totalDoners: doners })
}

export { getDoners, getDoner, updateDoner, deleteDoner, getDonersCount }