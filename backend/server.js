import path from 'path'
import cors from 'cors'
import express from 'express'

import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import simulationRoutes from './routes/simulationRoutes.js'
const port = process.env.PORT || 5000

connectDB()
const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// Cookie parser middleware
app.use(cookieParser())

// Define routes
app.use('/sollen/api/v4/users', userRoutes)
app.use('/sollen/api/v4/simulations', simulationRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

// Utilisez server.listen pour gérer à la fois l'API express et les connexions Socket.IO
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
