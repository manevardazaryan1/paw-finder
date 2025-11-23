import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import sequelize from './database/database.js'
import userRouter from './routes/user.js'
import reportRouter from './routes/report.js'
import { setupAssociations } from './database/associations.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()

const PORT = process.env.PORT

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(express.json())

app.use(cors(corsOptions))

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use('/auth', userRouter)
app.use('/reports', reportRouter)
app.use(errorHandler)

setupAssociations()

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err))

app.listen(PORT, () => {
  console.log(`\nAPI server running at http://localhost:${PORT}`)
})
