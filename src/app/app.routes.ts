import { Router } from 'express'
import { AuthRoutes } from './auth/auth.routes'
import { PatientRoutes } from './patient/patient.routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()
    router.use('/auth', AuthRoutes.routes)
    router.use('/patient', PatientRoutes.routes)
    return router
  }
}
