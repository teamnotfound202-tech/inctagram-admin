'use client'

import { UsersTable } from './UsersTable/UsersTable'
import { UsersPageTop } from './UsersPageTop/UsersPageTop'
import s from './UsersList.module.scss'

export const UsersList = () => {
  return (
    <div className={s.usersListPage}>
      <UsersPageTop />
      <UsersTable />
    </div>
  )
}
