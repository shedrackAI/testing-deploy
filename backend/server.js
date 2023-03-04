import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'
import mongoose from 'mongoose'

import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import v1Routes from './routes/v1/route.js'
import v1PaystackRoutes from './routes/v1/paystack/paystackRoutes.js'

const env = config()
const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI_KEY;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

mongoose.set('strictQuery', true)

mongoose.connect(MONGO_URI, {
  maxPoolSize: 3,
  connectTimeoutMS: 2500,
  useNewUrlParser: true,
  dbName: 'Fund_AFriend',
}, (err, success) => {
  if (err) console.log( err)
  if (success) console.log('MongoDB is connected...')
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/public', express.static('public'))

app.use('/api/v1', v1Routes)
app.use('/api/v1/u/payment', v1PaystackRoutes)

app.all('*', (req, res) => {
  res.status(404).send("Page Not Found!")
})

app.listen(PORT, () => {
  try{
    if (!fs.existsSync(path.join(__dirname, '/public'))) {
      fs.mkdirSync(path.join(__dirname, '/public'), { recursive: true })
      fs.mkdirSync(path.join(__dirname, '/public/uploads'), { recursive: true })
    }
  }
  catch(err) {
    if (err) throw err
  }

  console.log(`Server is running on port ${PORT}...`)
})

export default app