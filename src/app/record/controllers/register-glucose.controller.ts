import { Request, Response } from 'express'
import { RegisterClucoseDto } from '../dtos/register-glucose.dto'
import { HandleError } from '@/helpers/errors/handle-error'
import { VerifyUserDto } from '@/app/auth/dtos/verifyUser.dto'
import { CustomError } from '@/helpers/errors/custom-error'
import { RecordGlucoseService } from '../RecordGlusose.service'
import { CustomResponse } from '@/helpers/custom/custom-response'

export const registerGlucose = async (req: Request, res: Response) => {
  try {
    const [errorGlucose, registerGlucoseDto] = RegisterClucoseDto.check(
      req.body
    )
    const [errorUser, verifyUserDto] = VerifyUserDto.check(req.body)

    if (errorGlucose) throw CustomError.badRequest(errorGlucose)
    if (errorUser) throw CustomError.badRequest(errorUser)

    const record = await RecordGlucoseService.registerGlucose(
      registerGlucoseDto!,
      verifyUserDto!
    )

    CustomResponse.execute({
      res,
      message: 'Glucose registered successfully',
      data: record,
    })
  } catch (error) {
    HandleError.execute(error, 'Error registering glucose', res)
  }
}
