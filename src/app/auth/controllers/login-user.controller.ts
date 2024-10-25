import { Request, Response } from 'express'
import { LoginUserDto } from '../dtos/login-user.dto'
import { AuthServices } from '../auth.services'
import { CustomResponse } from '../../../helpers/custom/custom-response'
import { HttpStatus } from '../../../config/http-status'
import { JwtAuth } from '../../../config/jwtauth'
import { HandleError } from '../../../helpers/errors/handle-error'

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
