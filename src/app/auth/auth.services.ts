import { CustomError } from '@/helpers/errors/custom-error'
import { RegisterUserDto } from './dtos/register-user.dto'
import { PrismaClient } from '@prisma/client'
import { URL_IMAGE_DEFAULT } from '@/helpers/global/url-global'
import { Bcrypt } from '@/config/bcrypt'
import { LoginUserDto } from './dtos/login-user.dto'
import { VerifyUserDto } from './dtos/verifyUser.dto'

export class AuthServices {
  static async registerUser(registerUserDto: RegisterUserDto) {
    try {
      console.log({ registerUserDto })
      const { email, name, password, avatar, typeUserId } = registerUserDto
      const prisma = new PrismaClient()

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (user) {
        throw CustomError.badRequest('User already exists')
      }

      const newAvatar = await prisma.avatar.create({
        data: {
          url: avatar ? avatar : URL_IMAGE_DEFAULT,
        },
      })

      if (!newAvatar) {
        throw CustomError.badRequest('Error to create avatar')
      }

      const passwordHash = Bcrypt.hash(password)

      const roleDefault = await prisma.role.create({
        data: {
          doUser: true,
          doAdmin: false,
          doDevelop: false,
        },
      })

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: passwordHash,
          avatarId: newAvatar.id,
          roleId: roleDefault.id,
          typeUserId: 1,
        },
      })

      if (!newUser) {
        throw CustomError.badRequest('Error to create user')
      }

      const userResult = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: {
          id: newAvatar.id,
          url: newAvatar.url,
        },
      }

      return userResult
    } catch (error) {
      console.log({ error })
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }

  static async loginUser(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto
      const prisma = new PrismaClient()

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          avatar: true,
          role: true,
        },
      })

      if (!user) {
        throw CustomError.badRequest('User not found')
      }

      const passwordMatch = Bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        throw CustomError.badRequest('Invalid password')
      }

      const userResult = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: {
          id: user.avatar.id,
          url: `/uploads/${user.avatar.url}`,
        },
        role: user.role,
      }

      return userResult
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }

  static async verifyUser(verifyUserDto: VerifyUserDto) {
    try {
      const prisma = new PrismaClient()
      const { id } = verifyUserDto

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          avatar: true,
          role: true,
        },
      })

      if (!user) {
        throw CustomError.badRequest('User not found')
      }

      const userResult = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: {
          id: user.avatar.id,
          url: `/uploads/${user.avatar.url}`,
        },
        role: user.role,
      }

      return userResult
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }
}
