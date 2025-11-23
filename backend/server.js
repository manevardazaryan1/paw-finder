import express from 'express'
import cors from 'cors'
import http from 'http'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import sequelize from './database/database.js'
import userRouter from './routes/user.js'
import reportRouter from './routes/report.js'
import { setupAssociations } from './database/associations.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { socket } from './socket.js'

dotenv.config()

const app = express()

const server = http.createServer(app)
const PORT = process.env.PORT

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

socket(server)

app.use(express.json())

app.use(cors(corsOptions))

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use('/api/auth', userRouter)
app.use('/api/reports', reportRouter)
app.use(errorHandler)

setupAssociations()

sequelize.sync()

server.listen(PORT)
