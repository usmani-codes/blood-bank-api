import mongoose from "mongoose";

const testSchema = mongoose.Schema({
    doner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doner',
        required: true
    },
    testDate: {
        type: Date
    },
    result: {
        type: String,
        default: "pending"
    }

}, {
    timestamps: true
})

testSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

testSchema.set('toJSON', {
    virtuals: true
})


const Test = mongoose.model('Test', testSchema)

export default Test