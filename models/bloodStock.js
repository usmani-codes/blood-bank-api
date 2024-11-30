import mongoose from "mongoose";

const bloodStock = mongoose.Schema({
    bloodBank: { //hospitalName city country
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodBank',
        required: true
    },
    blood: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blood',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        default: new Date.now * 4800000
    }

}, {
    timestamps: true
})

bloodStock.virtual('id').get(function () {
    return this._id.toHexString()
})

bloodStock.set('toJSON', {
    virtuals: true
})


const BloodStock = mongoose.model('BloodStock', bloodStock)

export default BloodStock