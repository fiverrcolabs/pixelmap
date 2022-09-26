import Pixel from '../models/Pixel.js'
import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const addPixel = async (req, res) => {
  const { row, state, color, email } = req.body
  if (!state || !row || !color || !email) {
    throw new BadRequestError('please provide all values')
  }
  //   req.body.createdBy = req.user.userId
  // req.body.email = 'test2000@wiuwiu.de'
  // console.log(req.body)

  const user = await User.findOne({ email })

  if (!user) {
    throw new BadRequestError('Invalid User')
  }

  // console.log(user.point)
  if (user.point <= 0) {
    throw new BadRequestError('No Available pixels for user')
  }

  user.point -= 1
  await user.save()



  const pixel = await Pixel.create(req.body)

  res.status(StatusCodes.CREATED).json({ pixel })
}

const getPixels = async (req, res) => {
  const pixels = await Pixel.find()
  // console.log(pixels)
  res.status(StatusCodes.OK).json({ pixels })
}

export { addPixel, getPixels }
