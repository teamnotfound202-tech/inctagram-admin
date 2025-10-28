'use client'
import { Table } from '@/shared/ui'
import { TableHead } from '@/shared/ui'
import { TableRow } from '@/shared/ui'
import { TableBody } from '@/shared/ui'
import { TableH } from '@/shared/ui'
import { SuperPagination } from '@/shared/ui'
import { useState } from 'react'
import s from './UsersTable.module.scss'
import {TableUserItem} from "@/shared/ui";

export const UsersTable = () => {
  //Тестовые данные
  const users = [
    {
      id: 1,
      profile: 'Ivan.sr.yakimenko',
      email: 'ivan.sr.yakimenko@yandex.ru',
      userName: 'Ivan Yakymenko',
      createdAt: '2024-10-13T12:04:31.082Z',
      userBan: {
        reason: 'Bad behavior',
        createdAt: '2024-12-29T15:44:31.082Z',
      },
    },
    {
      id: 2,
      profile: 'Kirill_Mikulich',
      email: 'kirill_Mikulich@yandex.ru',
      userName: 'Kirill Mikulich',
      createdAt: '2023-11-15T15:55:31.082Z',
    },
    {
      id: 3,
      profile: 'Anton.Antonov',
      email: 'anton.Antonov@yandex.ru',
      userName: 'Anton Antonov',
      createdAt: '2022-06-16T10:44:31.082Z',
    },
    {
      id: 4,
      profile: 'OlegOlegovich',
      email: 'olegOlegovich@yandex.ru',
      userName: 'Oleg Olegovich',
      createdAt: '2023-01-22T07:55:31.082Z',
    },
    {
      id: 5,
      profile: 'Anna_Votakaya',
      email: 'anna_Votakaya@yandex.ru',
      userName: 'Anna Votakaya',
      createdAt: '2024-02-06T16:33:31.082Z',
    },
    {
      id: 6,
      profile: 'Nikilay89Kolya',
      email: 'nikilay89Kolya@yandex.ru',
      userName: 'Nikilay Kolya',
      createdAt: '2023-08-07T17:52:31.082Z',
    },
    {
      id: 7,
      profile: 'Artur_Perojcov',
      email: 'Artur_Perojcov@yandex.ru',
      userName: 'Artur Perojcov',
      createdAt: '2023-02-01T12:34:31.082Z',
    },
    {
      id: 8,
      profile: 'Ekaterina-Mastereo',
      email: 'ekaterina-Mastereo@yandex.ru',
      userName: 'Ekaterina Mastereo',
      createdAt: '2021-07-12T02:44:31.082Z',
    },
    {
      id: 9,
      profile: 'Anna_Votakaya',
      email: 'anna_Votakaya@yandex.ru',
      userName: 'Anna Votakaya',
      createdAt: '2024-02-06T16:33:31.082Z',
    },
    {
      id: 10,
      profile: 'Nikilay89Kolya',
      email: 'nikilay89Kolya@yandex.ru',
      userName: 'Nikilay Kolya',
      createdAt: '2023-08-07T17:52:31.082Z',
    },
    {
      id: 11,
      profile: 'Artur_Perojcov',
      email: 'Artur_Perojcov@yandex.ru',
      userName: 'Artur Perojcov',
      createdAt: '2023-02-01T12:34:31.082Z',
    },
    {
      id: 12,
      profile: 'Ekaterina-Mastereo',
      email: 'ekaterina-Mastereo@yandex.ru',
      userName: 'Ekaterina Mastereo',
      createdAt: '2021-07-12T02:44:31.082Z',
    },
  ]

  const [page, setPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(10)

  const pageChangeHandler = (page: number, count: number) => {
    setPage(page)
    setItemsCount(count)
  }
  const shownUsers = []
  let i: number = (page - 1) * itemsCount
  if (users) {
    //берем из пришедшего массива оплат только нужную порцию, чтобы отрисовать
    while (i <= page * itemsCount - 1 && i < users.length) {
      // const userLink = users[i].email.split('@')[0]
      // const profileLink = userLink[0].toUpperCase() + userLink.slice(1)
      shownUsers.push(<TableUserItem key={users[i].id} user={users[i]}/>)
      i++
    }
  }

  return (
    <div>
      <Table className={s.usersTable}>
        <TableHead>
          <TableRow>
            <TableH>User ID</TableH>
            <TableH>Profile link</TableH>
            <TableH>Username</TableH>
            <TableH>Date added</TableH>
            <TableH />
          </TableRow>
        </TableHead>
        <TableBody>{shownUsers}</TableBody>
      </Table>
      <SuperPagination
        itemsCount={itemsCount}
        page={page}
        totalCount={users?.length || 0}
        onChange={pageChangeHandler}
      />
    </div>
  )
}
