import express from 'express'

const PORT = 3000
const app = express()

app.use(express.json())

app.get('/', (_, res) => {
  res.send('Paw Finder api')
})

app.listen(PORT, () => {
  console.log(`\nAPI server running at http://localhost:${PORT}`)
})
