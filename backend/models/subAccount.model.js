import mongoose from "mongoose"

const subAccountSchema = new  mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "User"
    }, 
    business_name:{
        type: String,
        required: true,
    },
    bank_code:{
        type: String,
        required: true,
    },
    account_number:{
        type: String,
        required: true,
    },
    percentage_charge:{
        type: Number,
        default: 10,
    },
    settlement_bank: {
        type: String,
        default: ""
    },
    currency: {
        type: String,
        default: ""
    },
    bank: {
        type: Number,
    },
    subaccount_code: {
        type: String,
        default: ""
    },
    primary_contact_email:{
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false
    },
},{timestamps: true});

const SubAccount = mongoose.model("SubAccount", subAccountSchema);

export default SubAccount;