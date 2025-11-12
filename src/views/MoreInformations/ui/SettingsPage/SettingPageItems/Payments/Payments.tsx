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
import s from './Payments.module.scss'
import { useGetPaymentsByUserQuery } from '@/views/MoreInformations/api/getUserPayments.generated'

type Props = {
  userId: number
}
export const Payments = ({ userId }: Props) => {
  //Тестовые данные

  const [page, setPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(10)

  const { data } = useGetPaymentsByUserQuery({
    variables: { userId, pageNumber: page, pageSize: itemsCount },
  })

  const pageChangeHandler = (page: number, count: number) => {
    setPage(page)
    setItemsCount(count)
  }

  const shownPayments = data?.getPaymentsByUser.items.map((p) => {
    return (
      <TableRow key={p.id}>
        <TableDataCell>{new Date(p.dateOfPayment ?? '').toLocaleDateString('ru')}</TableDataCell>
        <TableDataCell>{new Date(p.endDate ?? '').toLocaleDateString('ru')}</TableDataCell>
        <TableDataCell>$ {p.price}</TableDataCell>
        <TableDataCell>{p.type}</TableDataCell>
        <TableDataCell>{p.type}</TableDataCell>
      </TableRow>
    )
  })

  return (
    <div>
      <Table className={s.usersTable}>
        <TableHead>
          <TableRow>
            <TableH>Date of Payment</TableH>
            <TableH>End date of subscription</TableH>
            <TableH>Amount, $</TableH>
            <TableH>Subscription Type</TableH>
            <TableH>Payment Type</TableH>
          </TableRow>
        </TableHead>
        <TableBody>{shownPayments}</TableBody>
      </Table>
      <SuperPagination
        itemsCount={itemsCount}
        page={page}
        totalCount={data?.getPaymentsByUser.totalCount || 0}
        onChange={pageChangeHandler}
      />
    </div>
  )
}
