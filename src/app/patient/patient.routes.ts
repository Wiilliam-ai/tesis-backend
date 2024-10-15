import { Router } from 'express'
import { PatientRegister } from './controllers/patient-register.controller'

export class PatientRoutes {
  static get routes(): Router {
    const router = Router()
    router.post('/register', PatientRegister.execute)
    router.patch('/update', (req, res) => {
      res.json({ message: 'Update route' })
    })
    router.delete('/delete/:id', (req, res) => {
      res.json({ message: 'Delete route' })
    })
    return router
  }
}
