import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index.js'

const authSocket = (token) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return false
  }

  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    return true
  } catch (error) {
    return false
  }
}

export default authSocket
