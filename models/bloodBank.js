import mongoose from "mongoose";

const bloodBankSchema = mongoose.Schema({
    name: { type: String, required: true }, //Alhabib Blood Bank
    hospital:{ //hospitalName city country
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hospital',
        required:true
    },
    phone:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

bloodBankSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

bloodBankSchema.set('toJSON',{
    virtuals:true
})

const BloodBank = mongoose.model('BloodBank', bloodBankSchema)

export default BloodBank