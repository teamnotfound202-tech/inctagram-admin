'use client'

import { ModalAgreement, PopUpSettingUser, TableDataCell, TableRow } from '@/shared/ui'
import s from './TableUserItem.module.scss'
import BanIcon from './icons/ban.svg'
import BtnIcon from './icons/btn.svg'
import Link from 'next/link'
import { useHandleModals } from '@/shared/lib/hooks/useHandleModals'
import { User } from '@/shared/graphql'
import { DeleteUserModal } from '@/shared/ui/DeleteUserModal/DeleteUserModal'
import { useState } from 'react'

type Props = {
  profileLink: string
  user: User
}

export const TableUserItem = ({ profileLink, user }: Props) => {
  const {
    handleChangeModal,
    isOpen,
    handleOpenAgreementModal,
    isOpenAgreementModal,
    typeModalAgreement,
    handleCloseAgreementModal,
  } = useHandleModals()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalHandler = (val:boolean)=>{
    setIsModalOpen(val)
    handleChangeModal(false)
  }
  return (
    <TableRow>
      <TableDataCell>
        <div className={s.idWrapper}>
          {user.userBan && <BanIcon />}
          {user.id}
        </div>
      </TableDataCell>
      <TableDataCell>
        <Link href={''}>{profileLink}</Link>
      </TableDataCell>
      <TableDataCell>{user.userName}</TableDataCell>
      <TableDataCell>{new Date(user.createdAt).toLocaleDateString('ru')}</TableDataCell>
      <TableDataCell className={s.btnCell}>
        <button className={s.btn} onClick={() => handleChangeModal(!isOpen)}>
          <BtnIcon />
        </button>
        {isOpen && (
          <PopUpSettingUser
            modalHandler={modalHandler}
            userId={user.id}
            handleChangeModalAction={handleChangeModal}
            isOpen={isOpen}
            handleOpenAgreementModalAction={handleOpenAgreementModal}
            userBan={user.userBan ?? null}
          />
        )}

        <DeleteUserModal
          userId={user.id}
          userName={user.userName}
          isOpen={isModalOpen}
          modalHandler={modalHandler}
        />

        <ModalAgreement
          isOpen={isOpenAgreementModal}
          type={typeModalAgreement}
          userId={user.id}
          userName={user.userName}
          handleCloseAgreementModalAction={handleCloseAgreementModal}
        />
      </TableDataCell>
    </TableRow>
  )
}