import mongoose from "mongoose";

const donerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blood: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blood',
        required: true
    },
    bloodBank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodBank',
        required: true
    },

}, {
    timestamps: true
})


donerSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

donerSchema.set('toJSON', {
    virtuals: true
})

const Doner = mongoose.model('Doner', donerSchema)

export default Doner