import { ISOStringFormat } from 'date-fns'
export type AgreementsType = 'ban' | 'delete' | 'unban'

export type BanUserType = {
    reason: string
  createdAt: ISOStringFormat
}
export type UserType = {
  id: number
  profile: string
  email: string
  userName: string
  createdAt: ISOStringFormat
  userBan: BanUserType | null
}