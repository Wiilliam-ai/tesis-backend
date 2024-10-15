export type TCardType = 'DNI' | 'CE' | 'PASSPORT'

export interface IPatient {
  id: number
  firstName: string
  lastName: string
  cardId: string
  email: string
  phone: string
  address: string
  typeCard: TCardType
}

export class PatientModel {}
