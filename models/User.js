import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  point: {
    type: Number,
    required: true,
    default: 3,
  },
})

export default mongoose.model('User', UserSchema)
