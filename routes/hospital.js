import express from "express";

import { getHospitals, getHospital, createHospital, updateHospital, deleteHospital, getHospitalsCount } from '../controllers/hospitalsController.js'

const router = express.Router()

//get all Hospitals
router.get('/', getHospitals)

//get single hospital
router.get('/:id', getHospital)

//create a hospital
router.post('/', createHospital)

//update a hospital
router.put('/:id', updateHospital)

//delete a hospital
router.delete('/:id', deleteHospital)

router.get('/get/count', getHospitalsCount)


export default router