'use client'

import BanIcon from './icons/ban.svg'
import UnBanIcon from './icons/unban.svg'
import DeleteIcon from './icons/delete.svg'
import MoreIcon from './icons/more.svg'
import s from './ModalSettingUser.module.scss'
import { useChangeModal } from '@/shared/lib'
import { Path } from '@/shared/config'
import { AgreementsType, BanUserType } from '@/shared/shared-types'
import { useRouter } from 'next/navigation'


type Props = {
  userId: number
  handleChangeModalAction: (value: boolean) => void
  isOpen: boolean
  handleOpenAgreementModalAction: (value: boolean, type: AgreementsType) => void
  modalHandler: (val:boolean) => void
  userBan: BanUserType | null
}

export const PopUpSettingUser = ({
  handleChangeModalAction,
  userId,
  isOpen,
  handleOpenAgreementModalAction,
  userBan,
  modalHandler
}: Props) => {
  const wrapperRef = useChangeModal({ isOpen, handleChangeModalAction: handleChangeModalAction })
const router = useRouter()

  return (
    <div className={s.modalSetting} ref={wrapperRef}>
      <button className={s.modalSettingBtn} onClick={()=>modalHandler(true)}>
        <DeleteIcon />
        Delete User
      </button>
      {userBan ? (
        <button
          className={s.modalSettingBtn}
          onClick={() => handleOpenAgreementModalAction(true, 'unban')}
        >
          <UnBanIcon />
          Un-ban User
        </button>
      ) : (
        <button
          className={s.modalSettingBtn}
          onClick={() => handleOpenAgreementModalAction(true, 'ban')}
        >
          <BanIcon />
          Ban in the system
        </button>
      )}
      <button className={s.modalSettingBtn} onClick={()=>{router.replace(`${Path.MoreInformations}?userId=${userId}`)}}>
        <MoreIcon />
        More Information
      </button>
    </div>
  )
}
