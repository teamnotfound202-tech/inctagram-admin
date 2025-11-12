'use client'

import { UsersTable } from './UsersTable/UsersTable'
import s from './UsersList.module.scss'
import { useGetUsersQuery } from '@/views/UsersList/api/userList.generated'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Input, SelectBox } from '@/shared/ui'
import { UserBlockStatus } from '@/shared/graphql'
import { useDebounce } from '@/shared/lib/utils/useDebounce'

export const UsersList = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const [itemsCount, setItemsCount] = useState(10)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchValue, setSearchValue] = useState('')

  const debounce= useDebounce(searchValue,750)

  const setParams = (value: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', value.toString())
    router.replace(`?${params.toString()}`)
  }
  const pageChangeHandler = (page: number, count: number) => {
    setPage(page)
    setParams(page)
    setItemsCount(count)
  }

  const { data } = useGetUsersQuery({
    variables: {
      pageNumber: page,
      pageSize: itemsCount,
      statusFilter: statusFilter as UserBlockStatus,
      searchTerm: debounce,
    },
  })


  return (
    <div className={s.usersListPage}>
      <div className={s.usersListPageTop}>
        <Input
          id={'inputSearch'}
          className={s.usersListSearchInput}
          type="search"
          placeholder={'Search'}
          onChange={(e)=>setSearchValue(e.target.value)}
          value={searchValue}
        />
        <SelectBox
          options={[
            { value: UserBlockStatus.Blocked, label: 'Blocked' },
            { value: UserBlockStatus.Unblocked, label: 'Not Blocked' },
          ]}
          name={'select1'}
          type={'lang'}
          defaultValue={UserBlockStatus.All}
          fullWidth={false}
          placeholder={'Not selected'}
          onValueChange={(value) => {
            setStatusFilter(value)
          }}
        />
      </div>

      <UsersTable
        pageChangeHandlerAction={pageChangeHandler}
        users={data?.getUsers.users || []}
        page={page}
        itemsCount={itemsCount}
        totalCount={data?.getUsers.pagination.totalCount || 0}
      />
    </div>
  )
}
