import express from 'express'

import { getTests, getTest, updateTest, deleteTest, getTestsCount, createTest } from '../controllers/testController.js'

const router = express.Router()

//get all Tests
router.get('/', getTests)

//get single Test
router.get('/:id', getTest)

//create an Test
router.post('/', createTest)

//update an Test
router.put('/:id', updateTest)

//delete an Test
router.delete('/:id', deleteTest)

//get Tests count
router.get('/get/count', getTestsCount)

export default router