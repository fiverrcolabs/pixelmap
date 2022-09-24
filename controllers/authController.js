import xmpp from 'simple-xmpp'
import jwt from 'jsonwebtoken'

import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'
import User from '../models/User.js'

const createJWT = (user) => {
  return jwt.sign({ userId: user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

const login = async (req, res) => {
  let count = 0

  const { email, password, server } = req.body
  if (!email || !password || !server) {
    throw new BadRequestError('please provide all values')
  }

  xmpp.on('online', async (data) => {
    count += 1
    // console.log(count)

    if (count > 1) return

    const userExist = await User.findOne({ email })

    if (!userExist) {
      await User.create({ email })
    }

    const token = createJWT(data.jid.user)
    res.status(StatusCodes.OK).json({
      user: {
        id: data.jid.user,
        email: email,
        server: server,
      },
      token,
    })

    xmpp.disconnect()
  })

  xmpp.on('error', (error) => {
    count += 1
    // console.log(count)

    if (count > 1) return

    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Invalid Credentials',
    })

    xmpp.disconnect()
  })

  xmpp.connect({
    jid: email,
    password: password,
    host: server,
  })
}

export { login }
