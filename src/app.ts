import express from 'express'
import cors from 'cors'
import { AppRoutes } from './app/app.routes'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use('/api', AppRoutes.routes)
