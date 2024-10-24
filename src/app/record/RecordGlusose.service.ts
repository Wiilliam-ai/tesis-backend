import { CustomError } from '@/helpers/errors/custom-error'
import { VerifyUserDto } from '../auth/dtos/verifyUser.dto'
import { RegisterClucoseDto } from './dtos/register-glucose.dto'
import { PrismaClient } from '@prisma/client'
import { UpdateGlucoseDto } from './dtos/update-glucose.dto'

export class RecordGlucoseService {
  static async registerGlucose(
    registerGlucoseDto: RegisterClucoseDto,
    verifyUserDto: VerifyUserDto
  ) {
    try {
      const { fasting, notes, clucoseLevel, userRegisterId } =
        registerGlucoseDto

      const prisma = new PrismaClient()

      const recordGlucose = await prisma.clusoseRecord.create({
        data: {
          clucoseLevel: clucoseLevel,
          fasting: fasting,
          notes: notes,
          userId: verifyUserDto.id,
          userRegisterId: userRegisterId ? userRegisterId : verifyUserDto.id,
        },
      })

      if (!recordGlucose) {
        throw CustomError.badRequest('Error to create record glucose')
      }

      return recordGlucose
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }

  static async listGlucoseByUser(verifyUserDto: VerifyUserDto) {
    try {
      const prisma = new PrismaClient()

      const records = await prisma.clusoseRecord.findMany({
        where: {
          userId: verifyUserDto.id,
        },
      })

      return records
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }

  static async updateGlucose(
    updateGlucoseDto: UpdateGlucoseDto,
    verifyUserDto: VerifyUserDto,
    idRecord: string
  ) {
    try {
      const { fasting, notes, clucoseLevel } = updateGlucoseDto

      const prisma = new PrismaClient()

      const existRecord = await prisma.clusoseRecord.findUnique({
        where: {
          id: idRecord,
        },
      })

      if (!existRecord) {
        throw CustomError.badRequest('Record not found')
      }

      if (existRecord.userId !== verifyUserDto.id) {
        throw CustomError.forbidden('You are not allowed to update this record')
      }

      const recordGlucose = await prisma.clusoseRecord.update({
        where: {
          id: idRecord,
        },
        data: {
          clucoseLevel: clucoseLevel,
          fasting: fasting,
          notes: notes,
        },
      })

      return recordGlucose
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }

  static async deleteGlucose(idRecord: string, verifyUserDto: VerifyUserDto) {
    try {
      const prisma = new PrismaClient()

      const existRecord = await prisma.clusoseRecord.findUnique({
        where: {
          id: idRecord,
        },
      })

      if (!existRecord) {
        throw CustomError.badRequest('Record not found')
      }

      if (existRecord.userId !== verifyUserDto.id) {
        throw CustomError.forbidden('You are not allowed to delete this record')
      }

      const deleteRecord = await prisma.clusoseRecord.delete({
        where: {
          id: idRecord,
        },
      })

      return deleteRecord
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }
}
