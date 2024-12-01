import mongoose from 'mongoose'
import bcypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User } from '../models/user.js'
import Doner from '../models/doner.js'
import Recipient from '../models/recipient.js'
import Blood from '../models/blood.js'
import BloodBank from '../models/bloodBank.js'


const jwtSecret = process.env.JWT_SECRET

const login = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(401).json({ success: false, msg: 'please provide all required fields' })
    }

    const user = await User.findOne({ email: email }).select("+password")

    if (!user) {
        return res.status(404).json({ success: false, msg: 'user with this email not found' })
    }


    const passwordMatched = await bcypt.compare(password, user.password)

    if (!passwordMatched) {
        return res.status(401).json({ success: false, msg: 'incorrect email or password' })
    }

    user.hashedPassword = ''

    const token = jwt.sign({ email, isAdmin: user.isAdmin }, jwtSecret, { expiresIn: '1d' })

    console.log("logged in as:", user.name)
    res.status(201).json({ success: true, userId: user.id, msg: "user logedIn successfully ", token })

}

const register = async (req, res, next) => {
    console.log("registering user ..")
    const { name, email, password, age, phone, isAdmin, isDoner, isRecipient, blood, bloodBank, city, country } = req.body

    if (!name || !age || !email || !password || !phone || !city || !country) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields' })
    }

    const user = await User.findOne({ email: email })

    if (user) {
        return res.status(401).json({ success: false, msg: 'the user already exists!' })
    }

    const hashedPassword = await bcypt.hash(password, 10)


    if (isAdmin && (isDoner || isRecipient)) {
        return res.status(400).json({ success: false, msg: 'Admin can not be a doner or recipient !!' })
    }

    if (!isAdmin && (isDoner && isRecipient)) {
        return res.status(400).json({ success: false, msg: "user can't be both Doner and Recipient at the same time" })
    }

    if (!isAdmin && !isDoner && !isRecipient) {
        return res.status(400).json({ success: false, msg: 'user must be either admin, doner or recipient !!' })
    }


    if (!mongoose.isValidObjectId(blood) || !mongoose.isValidObjectId(bloodBank)) {
        return res.status(404).json({ success: false, msg: "invalid blood Type or blood bank Id " })
    }

    if (isDoner && (!blood || !bloodBank)) {
        return res.status(401).json({ success: false, msg: 'Doner must provide blood Type and Blood Bank' })
    }

    if (isRecipient && (!blood || !bloodBank)) {
        return res.status(401).json({ success: false, msg: 'Recipient must provide blood Type and Blood Bank' })
    }

    const dbBlood = Blood.findOne({ _id: blood })
    const dbBloodBank = BloodBank.findOne({ _id: blood })

    if (!isAdmin && !dbBlood && !dbBloodBank) {
        return res.status(400).json({ success: false, msg: 'either blood Type or blood bank id is not valid ..' })
    }

    //below order matters
    let newUser = new User({ name, email, age, password: hashedPassword, phone, isAdmin, isDoner, isRecipient, city, country })
    await newUser.save()

    if (isDoner) {
        let doner = new Doner({ user: newUser.id, blood, bloodBank })
        await doner.save()
    } else {
        let recipient = new Recipient({ user: newUser.id, blood, bloodBank })
        await recipient.save()
    }

    if (!newUser) {
        res.status(400).json({ success: false, msg: 'the user cannot be created!' })
    }

    const token = jwt.sign({ email, isAdmin }, jwtSecret, { expiresIn: '1d' })

    newUser.hashedPassword = ''

    const sendUser = [newUser].map((x) => ({ email: x.email, isAdmin: x.isAdmin, isDoner: x.isDoner, isRecipient: x.isRecipient }))

    return res.status(201).json({ success: true, msg: "user creatd successfully", data: sendUser[0], token })

}

export { login, register }