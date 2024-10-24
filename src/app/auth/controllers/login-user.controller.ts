import { Request, Response } from 'express'
import { LoginUserDto } from '../dtos/login-user.dto'
import { HttpStatus } from '@/config/http-status'
import { HandleError } from '@/helpers/errors/handle-error'
import { AuthServices } from '../auth.services'
import { JwtAuth } from '@/config/jwtauth'
import { CustomResponse } from '@/helpers/custom/custom-response'

export const loginUser = async (req: Request, res: Response) => {
  const [error, loginUserDto] = LoginUserDto.check(req.body)
  if (error) {
    CustomResponse.execute({
      message: error,
      res,
      status: HttpStatus.BAD_REQUEST,
    })
    return
  }

  try {
    const user = await AuthServices.loginUser(loginUserDto!)
    const token = await JwtAuth.generateToken({ id: user.id })

    CustomResponse.execute({
      message: 'User logged in successfully',
      res,
      status: HttpStatus.OK,
      data: { user, token },
    })
  } catch (error) {
    HandleError.execute(error, 'Error logging in user', res)
  }
}
