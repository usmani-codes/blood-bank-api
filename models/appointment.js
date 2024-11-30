import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    doner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doner',
        required: true
    },
    appointmentDate: {
        type: Date
    }

}, {
    timestamps: true
})

appointmentSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

appointmentSchema.set('toJSON', {
    virtuals: true
})


const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment