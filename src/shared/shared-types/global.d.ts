import { ISOStringFormat } from 'date-fns'
export type AgreementsType = 'ban' | 'delete' | 'unban'

export type BanUserType = {
    reason: string
    createAd: ISOStringFormat
}