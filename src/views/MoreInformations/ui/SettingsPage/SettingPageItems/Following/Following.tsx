'use client'
import {
  SuperPagination,
  Table,
  TableBody,
  TableDataCell,
  TableH,
  TableHead,
  TableRow,
} from '@/shared/ui'
import { useState } from 'react'
import s from './Following.module.scss'
import { SortButton } from '@/shared/ui/SortButton/SortButton'
import { useGetUserFollowingQuery } from '@/views/MoreInformations/api/getUserFollowing.generated'
import { UseSort } from '@/shared/lib/hooks/useSort'
import { SortDirection } from '@/shared/graphql'

type Props = {
  userId: number
}
export const Following = ({ userId }: Props) => {
  const [page, setPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(10)
  const {sortBy, sortDirection, sortDirectionHandler} = UseSort()

  const { data } = useGetUserFollowingQuery({
    variables: { userId, pageNumber: page, pageSize: itemsCount, sortBy: sortBy, sortDirection: sortDirection as SortDirection },
  })

  const pageChangeHandler = (page: number, count: number) => {
    setPage(page)
    setItemsCount(count)
  }
  const shownUserFollowing = data?.getFollowing.items.map((f) => {
    return (
      <TableRow key={f.userId}>
        <TableDataCell>{f.userId}</TableDataCell>
        <TableDataCell className={s.underlineUserName}>{f.userName}</TableDataCell>
        <TableDataCell>
          {f.firstName && f.lastName ? `${f.firstName} ${f.lastName}` : 'No UserName'}
        </TableDataCell>
        <TableDataCell>{new Date(f.createdAt).toLocaleDateString('ru')}</TableDataCell>
      </TableRow>
    )
  })

  return (
    <div>
      <Table className={s.usersTable}>
        <TableHead>
          <TableRow>
            <TableH>User ID</TableH>
            <TableH className={s.profLinkTable}>
              Profile link
              <SortButton typeofSort={'userName'} changeDirectionCallback={sortDirectionHandler}/>
            </TableH>
            <TableH>Username</TableH>
            <TableH className={s.profLinkTable}>
              Subscription Date
              <SortButton typeofSort={'created_at'} changeDirectionCallback={sortDirectionHandler}/>
            </TableH>
          </TableRow>
        </TableHead>
        <TableBody>{shownUserFollowing}</TableBody>
      </Table>
      <SuperPagination
        itemsCount={itemsCount}
        page={page}
        totalCount={data?.getFollowing.totalCount || 0}
        onChange={pageChangeHandler}
      />
    </div>
  )
}