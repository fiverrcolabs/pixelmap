import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import mongoose from 'mongoose'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

import dotenv from 'dotenv'
dotenv.config()

import morgan from 'morgan'
import 'express-async-errors'

// db and authentication
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoute.js'
import pixelmapRouter from './routes/pixelmapRoute.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddeware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'Production') {
  app.use(morgan('dev'))
}

app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Welcome!')
// })

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/pixelmap', authenticateUser, pixelmapRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddeware)

const PORT = process.env.PORT || 5500

io.of('/api/v1/socket').on('connection', (socket) => {
  console.log('socket.io: User connected: ', socket.id)

  socket.on('disconnect', () => {
    console.log('socket.io: User disconnected: ', socket.id)
  })
})

const start = async () => {
  try {
    connectDB(process.env.MONGO_URL)
    const connection = mongoose.connection

    connection.once('open', () => {
      console.log('MongoDB database connected')

      console.log('Setting change streams')
      const pixelmapChangeStream = connection.collection('pixels').watch()

      pixelmapChangeStream.on('change', (change) => {
        switch (change.operationType) {
          case 'insert':
            const pixel = {
              row: change.fullDocument.row,
              col: change.fullDocument.col,
              state: change.fullDocument.state,
            }
            io.of('/api/v1/socket').emit('newPixel', pixel)
            break

          default:
            break
        }
      })
    })
    server.listen(PORT, () => {
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
