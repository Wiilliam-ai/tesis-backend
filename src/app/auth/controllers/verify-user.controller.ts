import { Request, Response } from 'express'
import { VerifyUserDto } from '../dtos/verifyUser.dto'
import { HttpStatus } from '@/config/http-status'
import { HandleError } from '@/helpers/errors/handle-error'
import { AuthServices } from '../auth.services'
import { CustomResponse } from '@/helpers/custom/custom-response'

export const verifyUser = async (req: Request, res: Response) => {
  const [error, verifyUserDto] = VerifyUserDto.check(req.body)
  if (error) {
    CustomResponse.execute({
      message: error,
      res,
      status: HttpStatus.BAD_REQUEST,
    })
    return
  }

  try {
    const user = await AuthServices.verifyUser(verifyUserDto!)

    CustomResponse.execute({
      message: 'User verified successfully',
      res,
      status: HttpStatus.OK,
      data: { user },
    })
  } catch (error) {
    HandleError.execute(error, 'Error verifying user', res)
  }
}
