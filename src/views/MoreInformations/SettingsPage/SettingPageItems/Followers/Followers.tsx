'use client'
import { SuperPagination, Table, TableBody, TableDataCell, TableH, TableHead, TableRow } from '@/shared/ui'
import { useState } from 'react'
import s from './Followers.module.scss'
import { ISOStringFormat } from 'date-fns'
import ArrowSortUp from './../icons/ArrowSortUp.svg'
import ArrowSortDown from './../icons/ArrowSortDown.svg'

type Follow = {
  userId: number,
  userName: string,
  firstName: string,
  lastName: string,
  createdAt: ISOStringFormat
}

type FollowPaginationModel  = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: Follow[];
}

export const Followers = () => {
  //Тестовые данные
  const userFolowers: FollowPaginationModel = {
    pagesCount: 10,
    page: 1,
    pageSize: 100,
    totalCount: 1000,
    items: [
      {
        userId: 73,
        userName: "tehnoroboty123",
        firstName: "Tehnot",
        lastName: "Robott",
        createdAt: "2025-10-29T10:57:45.413Z" as ISOStringFormat
      },
      {
        userId: 12,
        userName: "lopatop",
        firstName: "Pavel",
        lastName: "L",
        createdAt: "2025-10-21T21:13:13.838Z" as ISOStringFormat
      },
      {
        userId: 77,
        userName: "litvEvg",
        firstName: "Евгений",
        lastName: "Литвиненко",
        createdAt: "2025-10-09T10:13:46.885Z" as ISOStringFormat
      },
      {
        userId: 10,
        userName: "khiblinsergiy",
        firstName: "Serhii",
        lastName: "blabla",
        createdAt: "2025-10-06T17:24:28.140Z" as ISOStringFormat
      },
      {
        userId: 5,
        userName: "irkoabc",
        firstName: "Ирина",
        lastName: "Шкирандо",
        createdAt: "2025-10-06T12:44:48.884Z" as ISOStringFormat
      },
      {
        userId: 25,
        userName: "khlopovdima",
        firstName: "Dima",
        lastName: "Hмсмсмсмиии",
        createdAt: "2025-10-06T12:43:05.727Z" as ISOStringFormat
      }
    ]
  }

  const [page, setPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(10)

  const pageChangeHandler = (page: number, count: number) => {
    setPage(page)
    setItemsCount(count)
  }
  const shownUserFollowers = []
  let i: number = (page - 1) * itemsCount
  if (userFolowers) {
    //берем из пришедшего массива оплат только нужную порцию, чтобы отрисовать
    while (i <= page * itemsCount - 1 && i < userFolowers.items.length) {
      shownUserFollowers.push(
        <TableRow key={userFolowers.items[i].userId}>
          <TableDataCell>{userFolowers.items[i].userId}</TableDataCell>
          <TableDataCell className={s.underlineUserName}>{userFolowers.items[i].userName}</TableDataCell>
          <TableDataCell>
            {userFolowers.items[i].firstName} {userFolowers.items[i].lastName}
          </TableDataCell>
          <TableDataCell>{new Date(userFolowers.items[i].createdAt).toLocaleDateString('ru')}</TableDataCell>
        </TableRow>
      )
      i++
    }
  }

  return (
    <div>
      <Table className={s.usersTable}>
        <TableHead>
          <TableRow>
            <TableH>User ID</TableH>
            <TableH className={s.profLinkTable}>
              Profile link
              <div className={s.arrowSort}>
                <ArrowSortUp/>
                <ArrowSortDown/>
              </div>
            </TableH>
            <TableH>Username</TableH>
            <TableH className={s.profLinkTable}>
              Subscription Date
              <div className={s.arrowSort}>
                <ArrowSortUp/>
                <ArrowSortDown/>
              </div>
            </TableH>
          </TableRow>
        </TableHead>
        <TableBody>{shownUserFollowers}</TableBody>
      </Table>
      <SuperPagination
        itemsCount={itemsCount}
        page={page}
        totalCount={userFolowers?.items.length || 0}
        onChange={pageChangeHandler}
      />
    </div>
  )
}

