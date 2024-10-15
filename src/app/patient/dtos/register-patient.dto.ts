import { IPatient, TCardType } from '@/model/patient.model'

export class RegisterPatientDto {
  public readonly firstName: string
  public readonly lastName: string
  public readonly cardId: string
  public readonly email: string
  public readonly phone?: string
  public readonly address?: string
  public readonly typeCard: TCardType

  constructor(props: Partial<IPatient>) {
    this.firstName = props.firstName || ''
    this.lastName = props.lastName || ''
    this.cardId = props.cardId || ''
    this.email = props.email || ''
    this.phone = props.phone || ''
    this.address = props.address || ''
    this.typeCard = props.typeCard || 'DNI'
  }

  static check(
    body: any
  ): [error?: string, registerPatientDto?: RegisterPatientDto] {
    const { firstName, lastName, cardId, email, phone, address, typeCard } =
      body

    const errors = []
    // erros de tipo de datos
    if (typeof firstName !== 'string')
      errors.push('First name must be a string')
    if (typeof lastName !== 'string') errors.push('Last name must be a string')
    if (typeof cardId !== 'string') errors.push('Card id must be a string')
    if (typeof email !== 'string') errors.push('Email must be a string')
    if (phone && typeof phone !== 'string')
      errors.push('Phone must be a string')
    if (address && typeof address !== 'string')
      errors.push('Address must be a string')
    if (typeof typeCard !== 'string') errors.push('Type card must be a string')

    if (errors.length) return [errors.join(', ')]

    if (!firstName) errors.push('First name is required')
    if (!lastName) errors.push('Last name is required')
    if (!cardId) errors.push('Card id is required')
    if (!email) errors.push('Email is required')
    if (!typeCard) errors.push('Type card is required')

    if (errors.length) return [errors.join(', ')]

    return [
      undefined,
      new RegisterPatientDto({
        firstName,
        lastName,
        cardId,
        email,
        phone,
        address,
        typeCard,
      }),
    ]
  }
}
