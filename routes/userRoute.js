import express from 'express'
const router = express.Router()

import {  getPoint } from '../controllers/userController.js'

// import rateLimiter from 'express-rate-limit'

// const apiLimiter = rateLimiter({
//     windowMs: 15*60*1000,
//     max: 10,
//     message: 'Too many requests from thi IP address, please try again after 15 minutes'
// })

// router.route('/login').post(apiLimiter, login)
// router.route('/addPointAll').get(addPointToAll)
// router.route('/deductPoint').post(deductPoint)
router.route('/getPoint').post(getPoint)

export default router
