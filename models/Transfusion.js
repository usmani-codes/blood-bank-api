import mongoose from "mongoose";

const transfusionSchema = mongoose.Schema({
    doner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doner',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipient',
        required: true
    },
    blood: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blood',
        required: true
    },
    transfusionDate: {
        type: Date
    },
    reaction: {
        type: String
    }

}, {
    timestamps: true
})

transfusionSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

transfusionSchema.set('toJSON', {
    virtuals: true
})


const Transfusion = mongoose.model('Transfusion', transfusionSchema)

export default Transfusion