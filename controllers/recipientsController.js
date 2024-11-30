import mongoose from 'mongoose'
import { User } from '../models/user.js'
import Recipient from '../models/recipient.js'

// @desc Get all recipients
// @route GET /api/v1/recipients
const getRecipients = async (req, res, next) => {
    const recipients = await Recipient.find({}).populate("user").populate("blood").populate("bloodBank")

    if (!recipients.length) {
        return res.status(404).json({ success: false, msg: 'no recipients found' })
    }

    return res.json({ success: true, data: recipients })
}

// @desc Get recipient by id
// @route GET /api/v1/recipients/:id
const getRecipient = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: 'not a valid recipient id' })
    }

    const recipient = await Recipient.findOne({ _id: id }).populate("user").populate("blood").populate("bloodBank")

    if (!recipient) {
        return res.status(404).json({ success: false, msg: 'no recipient found with this id' })
    }

    return res.json({ success: true, data: recipient })
}

// @desc update a recipient by id
// @route PUT /api/v1/recipients/:id
const updateRecipient = async (req, res, next) => {
    const { id } = req.params
    const { blood, bloodBank, user } = req.body

    if (user) {
        return res.status(401).json({ success: false, msg: "you cant can't change your id" })
    }

    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(blood) || !mongoose.isValidObjectId(bloodBank)) {
        return res.status(401).json({ success: false, msg: 'not a valid db id..' })
    }

    const recipient = await Recipient.findOneAndUpdate({ _id: id }, { blood, bloodBank }, { new: true }).populate("user").populate("blood").populate("bloodBank")

    if (!recipient) {
        return res.status(404).json({ success: false, msg: 'recipient with this id not found' })
    }

    res.status(201).json({ msg: 'recipient updated ', data: recipient })
}

// @desc delete a recipient by id
// @route DELETE /api/v1/recipients/:id
const deleterecipient = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid recipient Id.." })
    }

    //delete the user before deleting recipient
    const recipientUser = await Recipient.findOne({ _id: id })

    if (!recipientUser) {
        return res.status(404).json({ success: false, msg: `user not found` })
    }

    console.log('deleting user with id: ', recipientUser.user)
    await User.findOneAndDelete({ _id: recipientUser.user })


    console.log("deleting recipient ..")
    const recipient = await Recipient.findOneAndDelete({ _id: id })

    if (!recipient) {
        return res.status(404).json({ success: false, msg: `recipient not found` })
    }

    res.status(203).json({ success: true, msg: `recipient deleted`, recipient })
}

// @desc get recipients total count
// @route GET /api/v1/recipients/get/count
const getRecipientsCount = async (req, res, next) => {
    const recipients = await Recipient.countDocuments()
    res.status(200).json({ success: true, totalrecipients: recipients })
}

export { getRecipients, getRecipient, updateRecipient, deleterecipient, getRecipientsCount }