import express from 'express'
import { AppRoutes } from './app/app.routes'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', AppRoutes.routes)
