'use client'

import BanIcon from './icons/ban.svg'
import UnBanIcon from './icons/unban.svg'
import DeleteIcon from './icons/delete.svg'
import MoreIcon from './icons/more.svg'
import s from './ModalSettingUser.module.scss'
import {useChangeModal} from '@/shared/lib'
import { Path } from '@/shared/config'
import Link from 'next/link'
import { AgreementsType, BanUserType } from '@/shared/shared-types'

type Props = {
    // userId: number
    handleChangeModalAction: (value: boolean) => void
    isOpen: boolean
    handleOpenAgreementModalAction: (value: boolean, type: AgreementsType) => void
    userBan: BanUserType|null
}

export const ModalSettingUser = ({
     // userId,
     handleChangeModalAction,
     isOpen,
     handleOpenAgreementModalAction,
     userBan
}: Props) => {
    const wrapperRef = useChangeModal({isOpen, handleChangeModalAction: handleChangeModalAction})
    return (
        <div className={s.modalSetting} ref={wrapperRef}>
            <button className={s.modalSettingBtn} onClick={() => handleOpenAgreementModalAction(true, 'delete')}>
                <DeleteIcon/>
                Delete User
            </button>
            {userBan ? (
                <button className={s.modalSettingBtn} onClick={() => handleOpenAgreementModalAction(true, 'unban')}>
                    <UnBanIcon/>
                    Un-ban User
                </button>
                ) : (
                <button className={s.modalSettingBtn} onClick={() => handleOpenAgreementModalAction(true, 'ban')}>
                    <BanIcon/>
                    Ban in the system
                </button>
                )
            }
            <Link className={s.modalSettingBtn} href={Path.MoreInformations}>
                <MoreIcon/>
                More Information
            </Link>
        </div>
    )
}