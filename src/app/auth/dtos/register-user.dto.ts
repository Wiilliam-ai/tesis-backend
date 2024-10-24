export class RegisterUserDto {
  constructor(
    public email: string,
    public name: string,
    public password: string,
    public avatar?: string,
    public typeUserId?: number
  ) {}

  static check(obj: any): [error?: string, registerUserDto?: RegisterUserDto] {
    const { email, name, password, avatar, typeUserId } = obj

    const errors: string[] = []
    if (!email) errors.push('email is required')
    if (!name) errors.push('name is required')
    if (!password) errors.push('password is required')

    if (errors.length) return [errors.join(', ')]

    return [
      undefined,
      new RegisterUserDto(email, name, password, avatar, typeUserId),
    ]
  }
}
