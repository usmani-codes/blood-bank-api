import Blood from '../models/blood.js'

// @desc Get all blood Type
// @route GET /api/v1/bloods
const getBloodTypes = async (req, res, next) => {
    const bloods = await Blood.find({})

    if (!bloods.length) {
        return res.status(404).json({ success: false, msg: 'no blood Type found' })
    }

    return res.json({ success: true, data: bloods })
}


// @desc Get all blood Type
// @route GET /api/v1/bloodsd
const getBloodType = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid hospital id.." })
    }

    const blood = await Blood.find({ _id: id })

    if (!blood) {
        return res.status(404).json({ success: false, msg: 'no blood type found with this id' })
    }

    return res.json({ success: true, data: blood })
}

// @desc Create a new blood type
// @route POST /api/v1/bloods
const createBloodType = async (req, res, next) => {
    const { name, description } = req.body

    if (!name || !description) {
        return res.status(404).json({ success: false, msg: 'please fill all required fields ..' })
    }

    const blood = await Blood.findOne({ name })

    if (blood) {
        return res.status(401).json({ success: false, msg: 'blood type already existed !' })
    }

    const newBlood = new Blood({ name, description })
    await newBlood.save()

    if (!newBlood) {
        res.status(404).json({ success: false, msg: 'the blood type cannot be created!' })
    }

    res.status(200).json({ success: true, data: newBlood })
}

// @desc update a blood type by id
// @route PUT /api/v1/bloods/:id
const updateBloodType = async (req, res, next) => {
    const { id } = req.params
    const { type, description } = req.body

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid hospital id.." })
    }

    const blood = await Blood.findOneAndUpdate({ _id: id }, { type, description }, { new: true })

    if (!blood) {
        return res.status(404).json({ success: false, msg: 'blood type with this id not found' })
    }

    res.status(201).json({ msg: 'blood updated ', data: blood })
}


// @desc delete a blood by id
// @route DELETE /api/v1/bloods/:id
const deleteBloodType = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid Id" })
    }

    const blood = await Blood.findOneAndDelete({ _id: id })

    if (!blood) {
        return res.status(404).json({ success: true, Doner: `blood type could not deleted ..` })
    }

    res.status(200).json({ success: true, Doner: `blood deleted`, blood })
}


// @desc get bloods total count
// @route GET /api/v1/bloods/get/count
const getBloodTypesCount = async (req, res, next) => {
    const bloods = await Blood.countDocuments()
    res.status(200).json({ success: true, totalBloods: bloods })
}


export { getBloodTypes, getBloodType, createBloodType, updateBloodType, deleteBloodType, getBloodTypesCount }