'use client'

import { TableRow } from '@/shared/ui'
import { TableDataCell } from '@/shared/ui'
import s from './TableUserItem.module.scss'
import BanIcon from './icons/ban.svg'
import BtnIcon from './icons/btn.svg'
import Link from 'next/link'
import {ModalSettingUser} from "@/shared/ui";
import {useState} from 'react'

type Props = {
    profileLink: string
    user:  {
        id: number,
        profile: string,
        email: string,
        userName: string,
        createdAt: string,
        userBan: {
            reason: string,
            createdAt: string,
        },
    },
}

export const TableUserItem = ({profileLink, user}: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleChangeModal = (value: boolean) => {
        setIsOpen(value)
    }

    return (
        <TableRow>
            <TableDataCell>
                <div className={s.idWrapper}>
                    {user && user.userBan && <BanIcon />}
                    {user && user.id}
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
                    <ModalSettingUser handleChangeModal={handleChangeModal} isOpen={isOpen}/>
                )}
            </TableDataCell>
        </TableRow>
    )
}