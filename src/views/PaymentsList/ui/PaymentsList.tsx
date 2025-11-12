'use client'
import s from './PaymentsList.module.scss'
import {
  Avatar,
  CustomCheckbox,
  Input,
  SuperPagination,
  Table,
  TableBody,
  TableDataCell,
  TableH,
  TableHead,
  TableRow,
} from '@/shared/ui'
import React, { useEffect, useState } from 'react'
import { SortButton } from '@/shared/ui/SortButton/SortButton'
import { useGetPaymentsQuery } from '@/views/PaymentsList/api/getPayments.generated'
import { SortDirection } from '@/shared/graphql'
import { UseSort } from '@/shared/lib/hooks/useSort'
import { useDebounce } from '@/shared/lib/utils/useDebounce'

export const PaymentsList = () => {
  const [page, setPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(10) //Тестовые данные
  const [searchValue, setSearchValue] = useState('')

  const {sortBy, sortDirection, sortDirectionHandler} = UseSort()
  const debounceValue= useDebounce(searchValue,750)

  const { data: paymentsList,refetch } = useGetPaymentsQuery({
    variables: {
      pageSize: itemsCount,
      pageNumber: page,
      sortBy: sortBy,
      sortDirection: sortDirection as SortDirection,
      searchTerm: searchValue,
    },
  })

  useEffect(() => {
    refetch({
      sortBy: sortBy || 'created_at',
      sortDirection: (sortDirection as SortDirection),
      searchTerm: debounceValue
    })
  }, [sortBy, sortDirection, refetch, debounceValue])

  const pageChangeHandler = (pageNumber: number, count: number) => {
    setPage(pageNumber)
    setItemsCount(count)
  }
const searchValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value.trim())
}

  const shownPaymentsList = paymentsList?.getPayments?.items?.map((item)=>(
        <TableRow key={item.id}>
        <TableDataCell className={s.fullNameUser}>
          <Avatar src={item.avatars?.[0]?.url} alt={'avatar'} />
          {item.userName}
        </TableDataCell>
        <TableDataCell>
          {new Date(item?.createdAt ?? '').toLocaleDateString('ru')}
        </TableDataCell>
        <TableDataCell> {item.amount===0?'Нет подписки': `${item.currency} ${item.amount}`}</TableDataCell>
        <TableDataCell>{item.type}</TableDataCell>
        <TableDataCell>{item.paymentMethod}</TableDataCell>
      </TableRow>

  ))

  return (
    <div className={s.wrapper}>
      <div className={s.autoUpdateWrapper}>
        <CustomCheckbox text={'Autoupdate'} id={'autoupdate'} checked />
      </div>

      <div className={s.usersListPageTop}>
        <Input
          id={'inputSearch'}
          className={s.usersListSearchInput}
          type="search"
          placeholder={'Search'}
          onChange={searchValueHandler}
          value={searchValue}
        />
      </div>
      <Table className={s.usersTable}>
        <TableHead>
          <TableRow className={s.tableRow}>
            <TableH>
              <div className={s.table}>
                Full Name
                <SortButton typeofSort={'userName'} changeDirectionCallback={sortDirectionHandler}/>
              </div>
            </TableH>
            <TableH>
              <div className={s.table}>
                Date added
                <SortButton typeofSort={'created_at'} changeDirectionCallback={sortDirectionHandler}/>
              </div>
            </TableH>
            <TableH>
              <div className={s.table}>
                Amount, $
                <SortButton typeofSort={'amount'} changeDirectionCallback={sortDirectionHandler}/>
              </div>
            </TableH>
            <TableH>Subscription</TableH>
            <TableH>
              <div className={s.table}>
                Payment Method
                <SortButton typeofSort={'paymentMethod'} changeDirectionCallback={sortDirectionHandler}/>
              </div>
            </TableH>
          </TableRow>
        </TableHead>
        <TableBody>{shownPaymentsList}</TableBody>
      </Table>
      <SuperPagination
        itemsCount={paymentsList?.getPayments.pageSize||10}
        page={page}
        totalCount={paymentsList?.getPayments.totalCount||0}
        onChange={pageChangeHandler}
      />
    </div>
  )
}
