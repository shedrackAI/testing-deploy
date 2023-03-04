import mongoose from "mongoose"
const RegCodeSchema = new mongoose.Schema({
  checkCode: {
    type: String,
    required: true
  },
  codeExpiry: {
    type: String,
    required: true
  }
})

const RegCode = mongoose.model("regCode", RegCodeSchema)

export default RegCode