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
import s from './Followers.module.scss'
import { SortButton } from '@/shared/ui/SortButton/SortButton'
import { useGetUserFollowersQuery } from '@/views/MoreInformations/api/getUserFollowers.generated'

type Props = {
  userId: number
}
export const Followers = ({ userId }: Props) => {
  const [page, setPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(10)

  const { data } = useGetUserFollowersQuery({
    variables: { userId, pageNumber: page, pageSize: itemsCount },
  })

  const pageChangeHandler = (page: number, count: number) => {
    setPage(page)
    setItemsCount(count)
  }
  const shownUserFollowers = data?.getFollowers.items.map((f) => {
    return (
      <TableRow key={f.userId}>
        <TableDataCell>{f.userId}</TableDataCell>
        <TableDataCell className={s.underlineUserName}>{f.userName}</TableDataCell>
        <TableDataCell>
          {f.firstName} {f.lastName}
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
              <SortButton />
            </TableH>
            <TableH>Username</TableH>
            <TableH className={s.profLinkTable}>
              Subscription Date
              <SortButton />
            </TableH>
          </TableRow>
        </TableHead>
        <TableBody>{shownUserFollowers}</TableBody>
      </Table>
      <SuperPagination
        itemsCount={itemsCount}
        page={page}
        totalCount={data?.getFollowers.totalCount || 0}
        onChange={pageChangeHandler}
      />
    </div>
  )
}