import { Router } from 'express'
import { registerGlucose } from './controllers/register-glucose.controller'
import { listGlucose } from './controllers/list-glucose.controller'
import { updateGlucose } from './controllers/update-glucose.controller'
import { deletGlucose } from './controllers/delete-glucose.controller'

export class RecordClucoseRoutes {
  static get routes(): Router {
    const router = Router()
    router.get('/by-users', listGlucose)
    router.post('/', registerGlucose)
    router.patch('/:id', updateGlucose)
    router.delete('/:id', deletGlucose)
    return router
  }
}
