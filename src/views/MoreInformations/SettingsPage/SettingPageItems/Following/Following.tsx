'use client'
import { SuperPagination, Table, TableBody, TableDataCell, TableH, TableHead, TableRow } from '@/shared/ui'
import { useState } from 'react'
import s from './Following.module.scss'
import { ISOStringFormat } from 'date-fns'
import ArrowSortUp from './../icons/ArrowSortUp.svg'
import ArrowSortDown from './../icons/ArrowSortDown.svg'

type Follow = {
  userId: number,
  userName: string,
  firstName: string|null,
  lastName: string|null,
  createdAt: ISOStringFormat
}

type FollowPaginationModel  = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: Follow[];
}

export const Following = () => {
  //Тестовые данные
  const userFollowing: FollowPaginationModel = {
    pagesCount: 10,
    page: 1,
    pageSize: 100,
    totalCount: 1000,
    items: [
      {
        "userId": 73,
        "userName": "tehnoroboty123",
        "firstName": "Tehnot",
        "lastName": "Robott",
        "createdAt": "2025-10-22T08:05:41.469Z" as ISOStringFormat
      },
      {
        "userId": 77,
        "userName": "litvEvg",
        "firstName": "Евгений",
        "lastName": "Литвиненко",
        "createdAt": "2025-10-14T07:24:24.127Z" as ISOStringFormat
      },
      {
        userId: 1,
        userName: "teplygin07",
        firstName: "Artem",
        lastName: "Teplygin",
        createdAt: "2025-10-08T12:52:37.545Z" as ISOStringFormat
      },
      {
        userId: 10,
        userName: "khiblinsergiy",
        firstName: "Serhii",
        lastName: "blabla",
        createdAt: "2025-10-08T12:51:07.145Z" as ISOStringFormat
      },
      {
        userId: 40,
        userName: "deniss",
        firstName: null,
        lastName: null,
        createdAt: "2025-10-08T12:50:29.352Z" as ISOStringFormat
      },
      {
        userId: 39,
        userName: "elenashebrova",
        firstName: null,
        lastName: null,
        createdAt: "2025-10-07T15:05:24.315Z" as ISOStringFormat
      },
      {
        userId: 38,
        userName: "Vladislav",
        firstName: null,
        lastName: null,
        createdAt: "2025-10-07T15:04:39.522Z" as ISOStringFormat
      },
      {
        userId: 37,
        userName: "Mintakaaaa123",
        firstName: "fhgjп",
        lastName: "lastnae",
        createdAt: "2025-10-07T15:04:26.158Z" as ISOStringFormat
      },
      {
        userId: 36,
        userName: "nelly04",
        firstName: null,
        lastName: null,
        createdAt: "2025-10-07T15:04:18.010Z" as ISOStringFormat
      },
      {
        userId: 35,
        userName: "testform",
        firstName: null,
        lastName: null,
        createdAt: "2025-10-07T15:04:09.772Z" as ISOStringFormat
      }
    ]
  }

  const [page, setPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(10)

  const pageChangeHandler = (page: number, count: number) => {
    setPage(page)
    setItemsCount(count)
  }
  const shownUserFollowing = []
  let i: number = (page - 1) * itemsCount
  if (userFollowing) {
    //берем из пришедшего массива оплат только нужную порцию, чтобы отрисовать
    while (i <= page * itemsCount - 1 && i < userFollowing.items.length) {
      shownUserFollowing.push(
        <TableRow key={userFollowing.items[i].userId}>
          <TableDataCell>{userFollowing.items[i].userId}</TableDataCell>
          <TableDataCell className={s.underlineUserName}>{userFollowing.items[i].userName}</TableDataCell>
          <TableDataCell>
            {(userFollowing.items[i].firstName || userFollowing.items[i].lastName)
              ? `${userFollowing.items[i].firstName || ''} ${userFollowing.items[i].lastName || ''}`.trim()
              : 'ANONYMOUS'}
          </TableDataCell>
          <TableDataCell>{new Date(userFollowing.items[i].createdAt).toLocaleDateString('ru')}</TableDataCell>
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
        <TableBody>{shownUserFollowing}</TableBody>
      </Table>
      <SuperPagination
        itemsCount={itemsCount}
        page={page}
        totalCount={userFollowing?.items.length || 0}
        onChange={pageChangeHandler}
      />
    </div>
  )
}

