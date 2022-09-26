import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

// const addPointToAll = async (req, res) => {
    // TODO - authenticate
    // const users = await User.find()

    // for (const user of users) {
    //     user.point+=1
    //     await user.save()
    // }

    // res.status(StatusCodes.OK).json({ res: "Successfully Executed..." })
// }

// const deductPoint = async (req, res) => {
//     const { email } = req.body
//     const user = await User.findOne({ email })

//     if (!user) {
//         throw new BadRequestError('Invalid User')
//     }

//     // console.log(user.point)
//     if (user.point > 0) {
//         user.point-=1
//         await user.save()
//     }

//     res.status(StatusCodes.OK).json({ res: user })
// }

const getPoint = async (req, res) => {
    // console.log(req.body)
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        throw new BadRequestError('Invalid User')
    }

    res.status(StatusCodes.OK).json({ res: user })
}

export {  getPoint }
