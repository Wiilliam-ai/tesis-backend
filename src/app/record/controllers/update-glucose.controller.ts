import { HandleError } from '@/helpers/errors/handle-error'
import { Request, Response } from 'express'
import { RegisterClucoseDto } from '../dtos/register-glucose.dto'
import { VerifyUserDto } from '@/app/auth/dtos/verifyUser.dto'
import { CustomError } from '@/helpers/errors/custom-error'
import { RecordGlucoseService } from '../RecordGlusose.service'
import { CustomResponse } from '@/helpers/custom/custom-response'

export const updateGlucose = async (req: Request, res: Response) => {
  try {
    const [error, updateGlucoseDto] = RegisterClucoseDto.check(req.body)
    const [errorUser, verifyUserDto] = VerifyUserDto.check(req.body)
    const { id } = req.params

    if (error) throw CustomError.badRequest(error)
    if (errorUser) throw CustomError.badRequest(errorUser)
    if (!id) throw CustomError.badRequest('Id is required')

    const record = await RecordGlucoseService.updateGlucose(
      updateGlucoseDto!,
      verifyUserDto!,
      id
    )

    CustomResponse.execute({
      res,
      message: 'Glucose updated successfully',
      data: record,
    })
  } catch (error) {
    HandleError.execute(error, 'Error updating glucose', res)
  }
}
