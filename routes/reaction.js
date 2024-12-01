import express from 'express'

import { getReactions, getReaction, updateReaction, deleteReaction, getReactionsCount, createReaction } from '../controllers/reactionController.js'

const router = express.Router()

//get all reactions
router.get('/', getReactions)

//get single reaction
router.get('/:id', getReaction)

//create an reaction
router.post('/', createReaction)

//update an reaction
router.put('/:id', updateReaction)

//delete an reaction
router.delete('/:id', deleteReaction)

//get reactions count
router.get('/get/count', getReactionsCount)

export default router