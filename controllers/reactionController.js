import mongoose from 'mongoose'
import Reaction from '../models/reaction.js'

// @desc Get all reactions
// @route GET /api/v1/reactions
const getReactions = async (req, res, next) => {
    const reactions = await Reaction.find({}).populate('transfusion')

    if (!reactions.length) {
        return res.status(404).json({ success: false, msg: 'no reactions found' })
    }

    return res.json({ success: true, data: reactions })
}

// @desc Get reaction by id
// @route GET /api/v1/reactions/:id
const getReaction = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid reaction id.." })
    }

    const reaction = await Reaction.findOne({ _id: id })

    if (!reaction) {
        return res.status(404).json({ success: false, msg: 'no reaction found with this id' })
    }

    return res.json({ success: true, data: reaction })
}

// @desc Create a new reaction
// @route POST /api/v1/reactions
const createReaction = async (req, res, next) => {
    const { transfusion, reactionDescription } = req.body

    if (!transfusion || !reactionDescription) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields ..' })
    }

    const reaction = await Reaction.findOne({ transfusion })

    if (reaction) {
        return res.status(401).json({ success: false, msg: 'reaction for this transfusion already exists ..' })
    }

    const newReaction = new Reaction({ transfusion, reactionDescription })
    await newReaction.save()

    if (!newReaction) {
        res.status(500).json({ success: false, msg: 'the reaction cannot be created!' })
    }

    res.status(200).json({ success: true, data: newReaction })
}


// @desc update a reaction by id
// @route PUT /api/v1/reactions/:id
const updateReaction = async (req, res, next) => {
    const { id } = req.params
    const { transfusion, reactionDescription } = req.body

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid Reaction id.." })
    }

    if (transfusion) {
        return res.status(401).json({ success: false, msg: "you can't change transfusion id.." })
    }

    const reaction = await Reaction.findOneAndUpdate({ _id: id }, { reactionDescription }, { new: true })

    if (!reaction) {
        return res.status(404).json({ success: false, msg: 'reaction with this id not found' })
    }

    res.status(201).json({ msg: 'reaction updated ', data: reaction })
}

// @desc delete a reaction by id
// @route DELETE /api/v1/reactions/:id
const deleteReaction = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid Id" })
    }

    const reaction = await Reaction.findOneAndDelete({ _id: id })

    if (!reaction) {
        return res.status(404).json({ success: true, msg: `reaction type could not deleted ..` })
    }

    res.status(200).json({ success: true, msg: `reaction deleted`, reaction })
}

// @desc get reaction total count
// @route GET /api/v1/reactions/get/count
const getReactionsCount = async (req, res, next) => {
    const reaction = await Reaction.countDocuments()
    res.status(200).json({ success: true, totalReactions: reaction })
}

export { getReactions, getReaction, createReaction, updateReaction, deleteReaction, getReactionsCount }