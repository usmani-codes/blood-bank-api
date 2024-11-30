
import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email must be unique'],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [3, "Password can't be less than 3 letters"],
        select: false
    },
    phone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoner: {
        type: Boolean,
        default: false
    },
    isRecipient: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

userSchema.set('toJSON', {
    virtuals: true
})

export const User = mongoose.model('User', userSchema)

