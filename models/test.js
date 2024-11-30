import mongoose from "mongoose";

const testSchema = mongoose.Schema({
    doner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doner',
        required: true
    },
    TestDate: {
        type: Date
    },
    result: {
        type: String
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