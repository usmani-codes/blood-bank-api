import express from "express";

import { getBloodBanks, getBloodBank, createBloodBank, updateBloodBank, deleteBloodBank, getBloodBanksCount } from '../controllers/bloodBankController.js'

const router = express.Router()

//get all bloodBanks
router.get('/', getBloodBanks)

//get single Order
router.get('/:id', getBloodBank)

//create a Order
router.post('/', createBloodBank)

//update a Order
router.put('/:id', updateBloodBank)

//delete a Order
router.delete('/:id', deleteBloodBank)

//get total bloodBanks count
router.get('/get/count', getBloodBanksCount)


export default router