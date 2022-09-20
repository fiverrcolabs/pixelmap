import express from 'express'
const router = express.Router()

import { login } from '../controllers/authController.js'

// import rateLimiter from 'express-rate-limit'

// const apiLimiter = rateLimiter({
//     windowMs: 15*60*1000,
//     max: 10,
//     message: 'Too many requests from thi IP address, please try again after 15 minutes'
// })

// router.route('/login').post(apiLimiter, login)
router.route('/login').post(login)

export default router
