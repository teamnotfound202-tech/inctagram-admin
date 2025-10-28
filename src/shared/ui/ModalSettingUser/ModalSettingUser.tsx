'use client'

import BanIcon from './icons/ban.svg'
import DeleteIcon from './icons/delete.svg'
import MoreIcon from './icons/more.svg'
import s from './ModalSettingUser.module.scss'
import {useChangeModal} from '@/shared/lib'

type Props = {
    // userId: number
    handleChangeModal: (value: boolean) => void
    isOpen: boolean
}

export const ModalSettingUser = ({
     // userId,
     handleChangeModal,
     isOpen
}: Props) => {
    const wrapperRef = useChangeModal({isOpen, handleChangeModal})
    return (
        <div className={s.modalSetting} ref={wrapperRef}>
            <button className={s.modalSettingBtn}>
                <DeleteIcon/>
                Delete User
            </button>
            <button className={s.modalSettingBtn}>
                <BanIcon/>
                Ban in the system
            </button>
            <button className={s.modalSettingBtn}>
                <MoreIcon/>
                More Information
            </button>
        </div>
    )
}