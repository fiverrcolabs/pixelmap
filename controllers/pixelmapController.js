import Pixel from '../models/Pixel.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const addPixel = async (req, res) => {
  const { row, col, state } = req.body
  if (!state || !col || !row) {
    throw new BadRequestError('please provide all values')
  }
  //   req.body.createdBy = req.user.userId
  req.body.email = 'test2000@wiuwiu.de'
  const pixel = await Pixel.create(req.body)

  res.status(StatusCodes.CREATED).json({ pixel })
}

const getPixels = async (req, res) => {
  const pixels = await Pixel.find()

  res.status(StatusCodes.OK).json({ pixels })
}

export { addPixel, getPixels }
