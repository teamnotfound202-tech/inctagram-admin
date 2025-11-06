'use client'

import { TableRow, TableDataCell, ModalAgreement, ModalSettingUser} from '@/shared/ui'
import s from './TableUserItem.module.scss'
import BanIcon from './icons/ban.svg'
import BtnIcon from './icons/btn.svg'
import Link from 'next/link'
import type { AgreementsType, UserType } from '@/shared/shared-types'
import { useHandleModals } from '@/shared/lib/hooks/useHandleModals'

type Props = {
    profileLink: string
    user:  UserType
}

export const TableUserItem = ({profileLink, user}: Props) => {
    const {
      handleChangeModal,
      isOpen,
      handleOpenAgreementModal,
      isOpenAgreementModal,
      typeModalAgreement,
      handleCloseAgreementModal,
    } = useHandleModals()

    const handleBanUser = () => {
        console.log('handleBanUser')
    }


    const handleDeleteUser = () => {
        console.log('handleDeleteUser')
    }


    const handleUnBanUser = () => {
        console.log('handleUnBanUser')
    }

    const choiceFunction = (type: AgreementsType) => {
        let func;
        switch (type) {
            case 'ban':
                func = handleBanUser
                break;
            case 'unban':
                func = handleUnBanUser
                break;
            case 'delete':
                func = handleDeleteUser
                break;
            default:
                func = () => {}
        }
        return func
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
                    <ModalSettingUser
                        handleChangeModalAction={handleChangeModal}
                        isOpen={isOpen}
                        handleOpenAgreementModalAction={handleOpenAgreementModal}
                        userBan={user.userBan}
                    />
                )}
            </TableDataCell>
            <TableDataCell>
                {isOpenAgreementModal && (
                        <ModalAgreement
                            type={typeModalAgreement}
                            userName={user.userName}
                            handleCloseAgreementModal={handleCloseAgreementModal}
                            onClick={choiceFunction(typeModalAgreement)}
                        />
                    )
                }
            </TableDataCell>
        </TableRow>
    )
}