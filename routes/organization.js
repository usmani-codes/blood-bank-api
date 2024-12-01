import express from 'express'

import { getOrganizations, getOrganization, createOrganization, updateOrganization, deleteOrganization, getOrganizationsCount } from '../controllers/organizationController.js'

const router = express.Router()

//get all organizations
router.get('/', getOrganizations)

//get single organization 
router.get('/:id', getOrganization)

//create an organization  
router.post('/', createOrganization)

//update an organization           
router.put('/:id', updateOrganization)

//delete an organization
router.delete('/:id', deleteOrganization)

//get organizations count
router.get('/get/count', getOrganizationsCount)

export default router