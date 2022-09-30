import mongoose from 'mongoose'

const PixelSchema = new mongoose.Schema({
  row: {
    type: String,
    required: true,
    unique: true
  },
  // col: {
  //   type: Number,
  //   required: true,
  // },
  state: {
    type: Boolean,
    required: true,
    default: false,
  },
  color: {
    type: String,
    required: true,
    default: '',
  },
  email: {
    type: String,
    required: true,
    default: '',
  },
})

PixelSchema.index({ row: 1, col: 1, state: 1 }, { unique: true })

export default mongoose.model('Pixel', PixelSchema)
