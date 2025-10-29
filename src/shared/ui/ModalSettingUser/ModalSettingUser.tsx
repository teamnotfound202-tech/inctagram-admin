'use client'

import BanIcon from './icons/ban.svg'
import UnBanIcon from './icons/unban.svg'
import DeleteIcon from './icons/delete.svg'
import MoreIcon from './icons/more.svg'
import s from './ModalSettingUser.module.scss'
import {useChangeModal} from '@/shared/lib'
import {AgreementsType, BanUserType} from '@/shared/types'

type Props = {
    // userId: number
    handleChangeModal: (value: boolean) => void
    isOpen: boolean
    handleOpenAgreementModal: (value: boolean, type: AgreementsType) => void
    userBan: BanUserType
}

export const ModalSettingUser = ({
     // userId,
     handleChangeModal,
     isOpen,
     handleOpenAgreementModal,
     userBan
}: Props) => {
    const wrapperRef = useChangeModal({isOpen, handleChangeModal})
    return (
        <div className={s.modalSetting} ref={wrapperRef}>
            <button className={s.modalSettingBtn} onClick={() => handleOpenAgreementModal(true, 'delete')}>
                <DeleteIcon/>
                Delete User
            </button>
            {userBan ? (
                <button className={s.modalSettingBtn} onClick={() => handleOpenAgreementModal(true, 'unban')}>
                    <UnBanIcon/>
                    Un-ban User
                </button>
                ) : (
                <button className={s.modalSettingBtn} onClick={() => handleOpenAgreementModal(true, 'ban')}>
                    <BanIcon/>
                    Ban in the system
                </button>
                )
            }
            <button className={s.modalSettingBtn} onClick={() => {}}>
                <MoreIcon/>
                More Information
            </button>
        </div>
    )
}