import { Request, Response } from 'express'
import { RecordGlucoseService } from '../RecordGlusose.service'
import { VerifyUserDto } from '../../auth/dtos/verifyUser.dto'
import { CustomError } from '../../../helpers/errors/custom-error'
import { CustomResponse } from '../../../helpers/custom/custom-response'
import { HttpStatus } from '../../../config/http-status'
import { HandleError } from '../../../helpers/errors/handle-error'

export const listGlucose = async (req: Request, res: Response) => {
  try {
    const [error, verifyUserDto] = VerifyUserDto.check(req.body)

    if (error) {
      throw CustomError.badRequest(error)
    }

    const records = await RecordGlucoseService.listGlucoseByUser(verifyUserDto!)

    CustomResponse.execute({
      res,
      message: 'Glucose listed successfully',
      data: records,
      status: HttpStatus.OK,
    })
  } catch (error) {
    HandleError.execute(error, 'Error listing glucose', res)
  }
}
