import express from 'express'
import sequelize from './database/database.js'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

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

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err))

app.get('/', (_, res) => {
  res.send('Paw Finder api')
})

app.listen(PORT, () => {
  console.log(`\nAPI server running at http://localhost:${PORT}`)
})
