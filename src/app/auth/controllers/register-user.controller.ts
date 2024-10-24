import { Request, Response } from 'express'
import { RegisterUserDto } from '../dtos/register-user.dto'
import { AuthServices } from '../auth.services'
import { HttpStatus } from '@/config/http-status'
import { HandleError } from '@/helpers/errors/handle-error'
import { CustomResponse } from '@/helpers/custom/custom-response'
import { getFileProperty } from '@/utils/getFileProperty'
import { UploadFile } from '@/utils/uploadFile'

export const registerUser = async (req: Request, res: Response) => {
  const [name, buffer] = getFileProperty(req.file)

  const typeFile = name.split('.').pop()
  const existFile = name !== ''

  if (existFile) {
    if (typeFile !== 'png' && typeFile !== 'jpg') {
      CustomResponse.execute({
        message: 'Invalid file type',
        res,
        status: HttpStatus.BAD_REQUEST,
      })
      return
    }
  }

  req.body.avatar = name

  const [error, registerUserDto] = RegisterUserDto.check(req.body)

  if (error) {
    CustomResponse.execute({
      message: error,
      res,
      status: HttpStatus.BAD_REQUEST,
    })
    return
  }

  try {
    const user = await AuthServices.registerUser(registerUserDto!)
    const avatarIsSaved = user.avatar.url === name

    if (avatarIsSaved) {
      UploadFile.saveImage(user.avatar.url, buffer)
    }

    CustomResponse.execute({
      message: 'User registered successfully',
      res,
      status: HttpStatus.CREATED,
      data: user,
    })
  } catch (error) {
    HandleError.execute(error, 'Error registering user', res)
  }
}
