'use client'
import { Table } from '@/shared/ui'
import { TableHead } from '@/shared/ui'
import { TableRow } from '@/shared/ui'
import { TableBody } from '@/shared/ui'
import { TableH } from '@/shared/ui'
import { SuperPagination } from '@/shared/ui'
import { useState } from 'react'
import s from './UsersTable.module.scss'
import { TableUserItem } from '@/shared/ui'
import { useGetUsersQuery } from '@/views/UsersList/api/userList.generated'

export const UsersTable = () => {

  const [page, setPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(10)

  const { data } = useGetUsersQuery({ variables: {pageNumber:page} })

  const pageChangeHandler = (page: number, count: number) => {
    setPage(page)
    setItemsCount(count)
  }

   const showUsers = data?.getUsers.users.map((user) => {
    const userLink = user.email.split('@')[0]
    const profileLink = userLink[0].toUpperCase() + userLink.slice(1)
    return <TableUserItem key={user.id} user={user} profileLink={profileLink} />
  })


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
            <TableH />
          </TableRow>
        </TableHead>
        <TableBody>{showUsers}</TableBody>
      </Table>
      <SuperPagination
        itemsCount={itemsCount}
        page={page}
        totalCount={data?.getUsers.pagination.totalCount || 0}
        onChange={pageChangeHandler}
      />
    </div>
  )
}
