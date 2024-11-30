import express from 'express'

import { getDoners, getDoner, updateDoner, deleteDoner, getDonersCount } from '../controllers/donerController.js'

const router = express.Router()

//get all Doners
router.get('/', getDoners)

//get single Doner
router.get('/:id', getDoner)

//update a Doner
router.put('/:id', updateDoner)

//delete a Doner
router.delete('/:id', deleteDoner)

router.get('/get/count', getDonersCount)

export default router