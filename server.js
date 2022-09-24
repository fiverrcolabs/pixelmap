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
import userRouter from './routes/userRoute.js'

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
// app.use('/api/v1/pixelmap', pixelmapRouter)
app.use('/api/v1/user', userRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddeware)

const PORT = process.env.PORT || 5500

// authenticate socket connection
// import { UnAuthenticatedError } from './errors/index.js'
// import authSocket from './middleware/authSocket.js'

// io.use((socket, next) => {
//   if (authSocket(socket.handshake.headers['Authorization'])) {
//     next()
//     console.log('Authenticated')
//   } else {
//     next(new UnAuthenticatedError('Authentication Invalid'))
//     console.log('Not Authenticated')
//   }
// })

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
              color: change.fullDocument.color,
              state: change.fullDocument.state,
            }
            io.of('/api/v1/socket').emit('newPixel', pixel)
            break

          default:
            break
        }
      })

      // pixelmapChangeStream.on("send_message", (data) => {
      //   // socket.to(data.room).emit("receive_message", data);
      //   socket.emit("receive_message", data);
      //   console.log("server soket data",data)
    
      // });
    })
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

import CronJob from 'node-cron'
import User from './models/User.js'

CronJob.schedule('0 0 */23 * * *', async () => {
  const users = await User.find()

    for (const user of users) {
        user.point+=1
        await user.save()
    }

	const d = new Date();
	console.log('Log: ', d);
})