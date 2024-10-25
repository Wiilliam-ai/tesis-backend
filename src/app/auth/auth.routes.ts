import { Router } from 'express'
import { registerUser } from './controllers/register-user.controller'
import { loginUser } from './controllers/login-user.controller'
import { verifyUser } from './controllers/verify-user.controller'
import { FilesMiddleware } from '../../helpers/middlewares/files-midleware'
import { AuthMiddleware } from '../../helpers/middlewares/auth-midleware'

export class AuthRoutes {
  static get routes(): Router {
    const upload = FilesMiddleware.upload

    const router = Router()
    router.post('/register', upload.single('avatar'), registerUser)
    router.post('/login', loginUser)
    router.post('/verify', AuthMiddleware.verifyToken, verifyUser)
    return router
  }
}
