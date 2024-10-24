import { VerifyUserDto } from '@/app/auth/dtos/verifyUser.dto'
import { CustomError } from '@/helpers/errors/custom-error'
import { HandleError } from '@/helpers/errors/handle-error'
import { Request, Response } from 'express'
import { RecordGlucoseService } from '../RecordGlusose.service'
import { CustomResponse } from '@/helpers/custom/custom-response'

export const deletGlucose = async (req: Request, res: Response) => {
  try {
    const [error, verifyUserDto] = VerifyUserDto.check(req.body)
    const { id } = req.params

    if (error) throw CustomError.badRequest(error)
    if (!id) throw CustomError.badRequest('Id is required')

    const record = await RecordGlucoseService.deleteGlucose(id, verifyUserDto!)

    CustomResponse.execute({
      res,
      message: 'Glucose deleted successfully',
      data: record,
    })
  } catch (error) {
    HandleError.execute(error, 'Error deleting glucose', res)
  }
}
