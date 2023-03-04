import mongoose from "mongoose"

const NotificationSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true,
    default: ""
  },
  to: {
    type: String,
    required: true,
    default: ""
  },
  message: {
    type: String,
    default: ""
  },
  reference: {
    type: String,
    default: ""
  },
  profileImage: {
    type: String,
    default: ""
  },
  amount: {
    type: String,
    required: true,
    default: ""
  },
  token: {
    type: String,
    default: ""
  },
},{timestamps: true});

const Notification = mongoose.model('Notifications', NotificationSchema)

export default Notification