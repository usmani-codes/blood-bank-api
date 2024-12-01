import express from 'express'

import { getTransfusions, getTransfusion, updateTransfusion, deleteTransfusion, getTransfusionsCount, createTransfusion } from '../controllers/transfusionController.js'

const router = express.Router()

//get all transfusions
router.get('/', getTransfusions)

//get single transfusions
router.get('/:id', getTransfusion)

//create an transfusions
router.post('/', createTransfusion)

//update an transfusions
router.put('/:id', updateTransfusion)

//delete an transfusions
router.delete('/:id', deleteTransfusion)

//get transfusions count
router.get('/get/count', getTransfusionsCount)

export default router