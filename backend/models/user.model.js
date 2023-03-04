import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: false
  },
  website: {
    type: String,
    default: "",
    required: false
  },
  twitterHandle: {
    type: String,
    default: "",
    required: false
  },
  instagramHandle: {
    type: String,
    default: "",
    required: false
  },
  aboutMe: {
    type: String,
    default: "",
    required: false
  },
  supportersCount: {
    type: Number,
    default: 0,
    required: false
  },
  inviteLink: {
    type: String,
    default: "",
    required: false
  },
  role: {
    type: String,
    required: false
  },
  accountNumber: {
    type: String,
    default: "",
    required: false
  },
  accountName: {
    type: String,
    default: "",
    required: false
  },
  bankCode: {
    type: String,
    default: "",
    required: false
  },
  bankName: {
    type: String,
    default: "",
    required: false
  },
  subaccountCode: {
    type: String,
    default: "",
    required: false
  },
})

const User = mongoose.model('User', UserSchema)

export default User