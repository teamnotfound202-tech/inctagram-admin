'use client'

import { TableRow } from '@/shared/ui'
import { TableDataCell } from '@/shared/ui'
import s from './TableUserItem.module.scss'
import BanIcon from './icons/ban.svg'
import BtnIcon from './icons/btn.svg'
import Link from 'next/link'
import {ModalSettingUser} from "@/shared/ui";
import {useState} from 'react'
import {ModalAgreement} from '@/shared/ui';
import {BanUserType, AgreementsType} from '@/shared/shared-types'

type Props = {
    profileLink: string
    user:  {
        id: number,
        profile: string,
        email: string,
        userName: string,
        createdAt: string,
        userBan: BanUserType,
    },
}

export const TableUserItem = ({profileLink, user}: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAgreementModal, setIsOpenAgreementModal] = useState(false)
    const [typeModalAgreement, setTypeModalAgreement] = useState<AgreementsType>('ban')

    const handleChangeModal = (value: boolean) => {
        setIsOpen(value)
    }

    const handleOpenAgreementModal = (value: boolean, type: AgreementsType) => {
        setIsOpenAgreementModal(value)
        setTypeModalAgreement(type)
        setIsOpen(!value)
    }

    const handleCloseAgreementModal = (value: boolean) => {
        setIsOpenAgreementModal(value)
    }

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
                        handleChangeModal={handleChangeModal}
                        isOpen={isOpen}
                        handleOpenAgreementModal={handleOpenAgreementModal}
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