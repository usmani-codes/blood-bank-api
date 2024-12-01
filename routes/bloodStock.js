import express from 'express'

import { getBloodStocks, getBloodStock, updateBloodStock, deleteBloodStock, getBloodStocksCount, createBloodStock } from '../controllers/bloodStockController.js'

const router = express.Router()

//get all blood Stocks
router.get('/', getBloodStocks)

//get single blood Stock
router.get('/:id', getBloodStock)

//create blood Stock
router.post('/', createBloodStock)

//update blood Stock
router.put('/:id', updateBloodStock)

//delete blood Stock
router.delete('/:id', deleteBloodStock)

//get  count
router.get('/get/count', getBloodStocksCount)

export default router