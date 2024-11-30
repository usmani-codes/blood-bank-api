import mongoose from "mongoose";

const recipientSchema = mongoose.Schema({
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
    }

}, {
    timestamps: true
})

recipientSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

recipientSchema.set('toJSON', {
    virtuals: true
})

const Recipient = mongoose.model('Recipient', recipientSchema)

export default Recipient