import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import morgan from 'morgan'
import 'express-async-errors'

// db and authentication
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoute.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddeware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'Production') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome!')
})

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddeware)

const PORT = process.env.PORT || 5500

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL)
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

// import util from 'util'

// xmpp.on('online', (data) => {
//   console.log('hey you are onlie!')
//   console.log(`data is ${data}`)
//   console.log(
//     util.inspect(data, { showHidden: false, depth: null, colors: true })
//   )
//   xmpp.disconnect()
// })

// xmpp.on('error', (error) => {
//   console.log(`error is ${error}`)
//   xmpp.disconnect()
// })

// xmpp.connect({
//   jid: 'test2000@wiuwiu.de',
//   password: 'test2000',
//   host: 'wiuwiu.de',
// })
