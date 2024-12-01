import mongoose from "mongoose";

const reactionSchema = mongoose.Schema({
    transfusion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transfusion',
        required: true
    },
    reactionDescription: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

reactionSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

reactionSchema.set('toJSON', {
    virtuals: true
})


const Reaction = mongoose.model('Reaction', reactionSchema)

export default Reaction