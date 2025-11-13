'use client'
import {
  SuperPagination,
  Table,
  TableBody,
  TableH,
  TableHead,
  TableRow,
  TableUserItem,
} from '@/shared/ui'
import s from './UsersTable.module.scss'
import { DirectionType, SortButton, SortBy } from '@/shared/ui/SortButton/SortButton'
import { User } from '@/shared/graphql'
import { createUserLink } from '@/shared/lib/utils/createUserLink'
import React from 'react'

type Props = {
  users: User[]
  page: number
  itemsCount: number
  totalCount: number
  pageChangeHandlerAction: (page: number, count: number) => void
  sortDirectionHandlerAction:(direction: DirectionType,type:SortBy) => void
}

export const UsersTable = ({
  users,
  pageChangeHandlerAction,
  page,
  itemsCount,
  totalCount,
  sortDirectionHandlerAction
}: Props) => {
  const showUsers = users.map((user) => {
    const profileLink = createUserLink(user.email)
    return <TableUserItem key={user.id} user={user} profileLink={profileLink} />
  })

  return (
    <div>
      <Table className={s.usersTable}>
        <TableHead>
          <TableRow>
            <TableH>User ID</TableH>
            <TableH>
              <div className={s.table}>
                Profile link
                <SortButton typeofSort={'userName'} changeDirectionCallback={sortDirectionHandlerAction}/>
              </div>
            </TableH>
            <TableH>Username</TableH>
            <TableH>
              <div className={s.table}>
                Date added
                <SortButton typeofSort={'created_at'} changeDirectionCallback={sortDirectionHandlerAction}/>
              </div>
            </TableH>
            <TableH />
          </TableRow>
        </TableHead>
        <TableBody>{showUsers}</TableBody>
      </Table>
      <SuperPagination
        itemsCount={itemsCount}
        page={page}
        totalCount={totalCount}
        onChange={pageChangeHandlerAction}
      />
    </div>
  )
}
