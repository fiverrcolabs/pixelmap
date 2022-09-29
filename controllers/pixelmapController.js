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

  const pixelexist = await Pixel.findOne({ row })

  if (pixelexist) {
    if (pixelexist.color === color) {
      throw new BadRequestError('cant coverwrite same color pixel')
    }
    console.log(pixelexist)
    pixelexist.row=row;
    pixelexist.color = color;
    pixelexist.email = email;
    await pixelexist.save();
    user.point -= 1
    await user.save()

    return res.status(StatusCodes.CREATED).json({ pixelexist })
  } else {
    const pixel = await Pixel.create(req.body)
    user.point -= 1
    await user.save()

    return res.status(StatusCodes.CREATED).json({ pixel })
  }

  // user.point -= 1
  // await user.save()

  // res.status(StatusCodes.CREATED).json({ pixel })
}

const getPixels = async (req, res) => {
  const pixels = await Pixel.find()
  // console.log(pixels)
  res.status(StatusCodes.OK).json({ pixels })
}

export { addPixel, getPixels }
