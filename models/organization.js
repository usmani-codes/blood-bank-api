import mongoose from "mongoose";

const organizationSchema = mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    }

}, {
    timestamps: true
})

organizationSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

organizationSchema.set('toJSON', {
    virtuals: true
})


const Organization = mongoose.model('Organization', organizationSchema)

export default Organization