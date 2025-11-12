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
import { SortButton } from '@/shared/ui/SortButton/SortButton'
import { User } from '@/shared/graphql'
import { createUserLink } from '@/shared/lib/utils/createUserLink'

type Props = {
  users: User[]
  page: number
  itemsCount: number
  totalCount: number
  pageChangeHandlerAction: (page: number, count: number) => void
}

export const UsersTable = ({
  users,
  pageChangeHandlerAction,
  page,
  itemsCount,
  totalCount,
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
                <SortButton />
              </div>
            </TableH>
            <TableH>Username</TableH>
            <TableH>
              <div className={s.table}>
                Date added
                <SortButton />
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
