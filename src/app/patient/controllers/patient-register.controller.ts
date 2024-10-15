import { Request, Response } from 'express'
import { RegisterPatientDto } from '../dtos/register-patient.dto'
import { GeneralResponse } from '../../../helpers/GeneralResponse'
import { HttpStatus } from '@/config/http-status'

export class PatientRegister {
  static async execute(req: Request, res: Response) {
    try {
      const [error, registerPatientDto] = RegisterPatientDto.check(req.body)

    } catch (error) {

      
    }
  }
}
