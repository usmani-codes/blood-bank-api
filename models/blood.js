import mongoose from "mongoose";

const bloodSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
}, {
    timestamps: true
})

bloodSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

bloodSchema.set('toJSON', {
    virtuals: true
})


const Blood = mongoose.model('Blood', bloodSchema)

export default Blood