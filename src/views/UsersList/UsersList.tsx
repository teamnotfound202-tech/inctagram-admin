'use client'

import { UsersTable } from './ui/UsersTable/UsersTable'
import { UsersPageTop } from './ui/UsersPageTop/UsersPageTop'
import s from './UsersList.module.scss'

export const UsersList = () => {
  return (
    <div className={s.usersListPage}>
      <UsersPageTop />
      <UsersTable />
    </div>
  )
}
