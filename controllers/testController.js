import mongoose from 'mongoose'
import Test from '../models/test.js'

// @desc Get all tests
// @route GET /api/v1/tests
const getTests = async (req, res, next) => {
    const tests = await Test.find({}).populate({ path: "doner", populate: ["user", "blood", "bloodBank"] })

    if (!tests.length) {
        return res.status(404).json({ success: false, msg: 'no tests found' })
    }

    return res.json({ success: true, data: tests })
}

// @desc Get test by id
// @route GET /api/v1/tests/:id
const getTest = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid test id.." })
    }

    const test = await Test.findOne({ _id: id }).populate({ path: "doner", populate: ["user", "blood", "bloodBank"] })

    if (!test) {
        return res.status(404).json({ success: false, msg: 'no test found with this id' })
    }

    return res.json({ success: true, data: test })
}

// @desc Create a new test
// @route POST /api/v1/tests
const createTest = async (req, res, next) => {
    const { doner, testDate, result } = req.body

    if (!mongoose.isValidObjectId(doner)) {
        res.status(400).json({ success: false, msg: "invalid test id.." })
    }

    if (!doner || !testDate) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields ..' })
    }

    const test = await Test.findOne({ doner, testDate }).populate({ path: "doner", populate: ["user", "blood", "bloodBank"] })

    // console.log(test && JSON.stringify(testDate) === JSON.stringify(test.testDate))
    if (test && JSON.stringify(testDate) === JSON.stringify(test.testDate)) {
        return res.status(400).json({ success: false, msg: `user has already a test in progress..` })
    }

    const newTest = new Test({ doner, testDate, result })
    await newTest.save()

    if (!newTest) {
        res.status(404).json({ success: false, msg: 'the test cannot be created!' })
    }

    res.status(200).json({ success: true, data: newTest })
}


// @desc update a test by id
// @route PUT /api/v1/tests/:id
const updateTest = async (req, res, next) => {
    const { id } = req.params
    const { doner, testDate, result } = req.body

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ success: false, msg: "invalid test id.." })
    }

    if (doner) {
        return res.status(401).json({ success: false, msg: "you can't change your id.." })
    }

    const test = await Test.findOneAndUpdate({ _id: id }, { testDate, result }, { new: true }).populate({ path: "doner", populate: ["user", "blood", "bloodBank"] })

    if (!test) {
        return res.status(404).json({ success: false, msg: 'test with this id not found' })
    }

    res.status(201).json({ msg: 'test updated ', data: test })
}

// @desc delete a test by id
// @route DELETE /api/v1/tests/:id
const deleteTest = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid Id" })
    }

    const test = await Test.findOneAndDelete({ _id: id })

    if (!test) {
        return res.status(404).json({ success: true, Doner: `test type could not deleted ..` })
    }

    res.status(200).json({ success: true, Doner: `test deleted`, test })
}

// @desc get tests total count
// @route GET /api/v1/tests/get/count
const getTestsCount = async (req, res, next) => {
    const tests = await Test.countDocuments()
    res.status(200).json({ success: true, totaltests: tests })
}

export { getTests, getTest, createTest, updateTest, deleteTest, getTestsCount }