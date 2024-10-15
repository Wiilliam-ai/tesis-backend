import { Response } from 'express'
import { CustomError } from './custom-error'
import { CustomResponse } from '../custom/custom-response'

export class HandleError {
  static execute = (error: unknown, logMsg: string, res: Response) => {
    if (error instanceof CustomError) {
      CustomResponse.execute({
        res,
        status: error.statusCode,
        message: error.message,
      })
      return
    }

    CustomResponse.execute({
      res,
      status: 500,
      message: 'Internal server error',
    })
  }
}
