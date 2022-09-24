import Pixel from '../models/Pixel.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const addPixel = async (req, res) => {
  const { row,  state,color } = req.body
  if (!state  || !row || !color) {
    throw new BadRequestError('please provide all values')
  }
  //   req.body.createdBy = req.user.userId
  req.body.email = 'test2000@wiuwiu.de'
  // console.log(req.body)
  const pixel = await Pixel.create(req.body)

  res.status(StatusCodes.CREATED).json({ pixel })
}

const getPixels = async (req, res) => {
  const pixels = await Pixel.find()
  // console.log(pixels)
  res.status(StatusCodes.OK).json({ pixels })
}

export { addPixel, getPixels }
