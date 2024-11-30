import express from "express";

import { getUsers, getUser, updateUser, deleteUser, getUsersCount } from '../controllers/usersController.js'
import { AdminsOnly } from '../middlewares/index.js'

const router = express.Router()

//get all Users
router.get('/', getUsers)

//get single User
router.get('/:id', getUser)

//update a User
router.put('/:id', updateUser)

//delete a User
router.delete('/:id', deleteUser)
// get users count
router.get('/get/count', getUsersCount)


export default router