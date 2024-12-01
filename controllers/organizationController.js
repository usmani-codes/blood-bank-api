import mongoose from 'mongoose'
import Organization from '../models/organization.js'

// @desc Get all organization
// @route GET /api/v1/organizations
const getOrganizations = async (req, res, next) => {
    const organizations = await Organization.find({})

    if (!organizations.length) {
        return res.status(404).json({ success: false, msg: 'no organizations found' })
    }

    return res.json({ success: true, data: organizations })
}


// @desc Get all organization
// @route GET /api/v1/organizationsd
const getOrganization = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid id.." })
    }

    const organization = await Organization.find({ _id: id })

    if (!organization) {
        return res.status(404).json({ success: false, msg: 'no organization found with this id' })
    }

    return res.json({ success: true, data: organization })
}

// @desc Create a new organization
// @route POST /api/v1/organizations
const createOrganization = async (req, res, next) => {
    const { name, phone } = req.body

    if (!name || !phone) {
        return res.status(404).json({ success: false, msg: 'please fill all required fields ..' })
    }

    const organization = await Organization.findOne({ name })

    if (organization) {
        return res.status(401).json({ success: false, msg: 'organization already existed !' })
    }

    const newOrganization = new Organization({ name, phone })
    await newOrganization.save()

    if (!newOrganization) {
        res.status(500).json({ success: false, msg: 'the organization cannot be created!' })
    }

    res.status(200).json({ success: true, msg: "organization created ..", data: newOrganization })
}

// @desc update a organization by id
// @route PUT /api/v1/organizations/:id
const updateOrganization = async (req, res, next) => {
    const { id } = req.params
    const { name, phone } = req.body

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid organization id.." })
    }

    const organization = await Organization.findOneAndUpdate({ _id: id }, { name, phone }, { new: true })

    if (!organization) {
        return res.status(404).json({ success: false, msg: 'organization with this id not found' })
    }

    res.status(201).json({ success: true, msg: 'organization updated ', data: organization })
}


// @desc delete a organization by id
// @route DELETE /api/v1/organizations/:id
const deleteOrganization = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: "invalid Id" })
    }

    const organization = await Organization.findOneAndDelete({ _id: id })

    if (!organization) {
        return res.status(404).json({ success: false, msg: `organization could not deleted ..` })
    }

    res.status(200).json({ success: true, msg: `organization deleted`, organization })
}


// @desc get organizations total count
// @route GET /api/v1/organizations/get/count
const getOrganizationsCount = async (req, res, next) => {
    const organizations = await Organization.countDocuments()
    res.status(200).json({ success: true, totalorganizations: organizations })
}


export { getOrganizations, getOrganization, createOrganization, updateOrganization, deleteOrganization, getOrganizationsCount }