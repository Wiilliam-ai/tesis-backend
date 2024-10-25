import { Router } from 'express'
import { AuthRoutes } from './auth/auth.routes'
import { RecordClucoseRoutes } from './record/RecordClucose.routes'
import { AuthMiddleware } from '../helpers/middlewares/auth-midleware'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()
    router.use('/auth', AuthRoutes.routes)
    router.use(
      '/records-clucose',
      AuthMiddleware.verifyToken,
      RecordClucoseRoutes.routes
    )
    return router
  }
}
