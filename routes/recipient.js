import express from 'express'

import { getRecipients, getRecipient, updateRecipient, deleterecipient, getRecipientsCount } from '../controllers/recipientsController.js'

const router = express.Router()

//get all Doners
router.get('/', getRecipients)

//get single Doner
router.get('/:id', getRecipient)

//update a Doner
router.put('/:id', updateRecipient)

//delete a Doner
router.delete('/:id', deleterecipient)

router.get('/get/count', getRecipientsCount)

export default router