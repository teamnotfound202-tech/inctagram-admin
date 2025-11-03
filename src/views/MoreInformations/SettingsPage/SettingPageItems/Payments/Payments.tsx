'use client'
import { Table, TableDataCell } from '@/shared/ui'
import { TableHead } from '@/shared/ui'
import { TableRow } from '@/shared/ui'
import { TableBody } from '@/shared/ui'
import { TableH } from '@/shared/ui'
import { SuperPagination } from '@/shared/ui'
import { useState } from 'react'
import s from './Payments.module.scss'
import { ISOStringFormat } from 'date-fns'

type PaymentMethod = "STRIPE" | "PAYPAL" | "CREDIT_CARD"

type SubscriptionType = "MONTHLY" | "DAY" | "WEEKLY"

type Payment = {
  id: string;
  paymentType: PaymentMethod;
  price: number;
  dateOfPayment: ISOStringFormat | string;
  endDate: ISOStringFormat;
  type: SubscriptionType;
}

type PaymentPaginationModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: Payment[];
}

export const Payments = () => {
  //Тестовые данные
  const userPayments: PaymentPaginationModel = {
    pagesCount: 10,
    page: 1,
    pageSize: 100,
    totalCount: 1000,
    items: [
      {
        id: "9a2908ac-864e-498b-bbd9-b4eddfc176e7",
        dateOfPayment: "2025-10-22T13:16:51.464Z",
        endDate: "2026-04-01T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "02687361-8d3c-490b-95a3-551555d8af11",
        dateOfPayment: "2025-10-22T13:16:51.164Z",
        endDate: "2026-03-31T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "ead99556-59e5-43e7-b061-a3587a6a0f02",
        dateOfPayment: "2025-10-22T13:11:25.137Z",
        endDate: "2026-03-30T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "fc4e3fcc-da64-474a-b569-e30181e76ce3",
        dateOfPayment: "2025-10-22T13:09:08.515Z",
        endDate: "2026-03-29T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "364a90ef-b70e-4cf5-aad4-43b079083e39",
        dateOfPayment: "2025-10-22T13:04:26.357Z",
        endDate: "2026-03-28T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "9a2908ac-864e-498b-bbd9-b4eddfc176e1",
        dateOfPayment: "2025-10-22T13:16:51.464Z",
        endDate: "2026-04-01T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "02687361-8d3c-490b-95a3-551555d8af12",
        dateOfPayment: "2025-10-22T13:16:51.164Z",
        endDate: "2026-03-31T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "ead99556-59e5-43e7-b061-a3587a6a0f03",
        dateOfPayment: "2025-10-22T13:11:25.137Z",
        endDate: "2026-03-30T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "fc4e3fcc-da64-474a-b569-e30181e76ce4",
        dateOfPayment: "2025-10-22T13:09:08.515Z",
        endDate: "2026-03-29T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "364a90ef-b70e-4cf5-aad4-43b079083e35",
        dateOfPayment: "2025-10-22T13:04:26.357Z",
        endDate: "2026-03-28T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "9a2908ac-864e-498b-bbd9-b4eddfc176e6",
        dateOfPayment: "2025-10-22T13:16:51.464Z",
        endDate: "2026-04-01T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "02687361-8d3c-490b-95a3-551555d8af71",
        dateOfPayment: "2025-10-22T13:16:51.164Z",
        endDate: "2026-03-31T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "ead99556-59e5-43e7-b061-a3587a8a0f02",
        dateOfPayment: "2025-10-22T13:11:25.137Z",
        endDate: "2026-03-30T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "fc4e3fcc-da64-474a-b569-e30191e76ce3",
        dateOfPayment: "2025-10-22T13:09:08.515Z",
        endDate: "2026-03-29T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
      {
        id: "364a90ef-b70e-4cf7-aad4-43b079083e39",
        dateOfPayment: "2025-10-22T13:04:26.357Z",
        endDate: "2026-03-28T13:02:27.932Z" as ISOStringFormat,
        price: 10,
        type: "DAY",
        paymentType: "STRIPE"
      },
    ]
  }

  const [page, setPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(10)

  const pageChangeHandler = (page: number, count: number) => {
    setPage(page)
    setItemsCount(count)
  }

  const shownPayments = []
  let i: number = (page - 1) * itemsCount
  if (userPayments) {
    //берем из пришедшего массива оплат только нужную порцию, чтобы отрисовать
    while (i <= page * itemsCount - 1 && i < userPayments.items.length) {
      shownPayments.push(
        <TableRow key={userPayments.items[i].id}>
          <TableDataCell>{new Date(userPayments.items[i].dateOfPayment).toLocaleDateString('ru')}</TableDataCell>
          <TableDataCell>{new Date(userPayments.items[i].endDate).toLocaleDateString('ru')}</TableDataCell>
          <TableDataCell>$ {userPayments.items[i].price}</TableDataCell>
          <TableDataCell>{userPayments.items[i].type}</TableDataCell>
          <TableDataCell>{userPayments.items[i].paymentType}</TableDataCell>
        </TableRow>
      )
      i++
    }
  }

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
        totalCount={userPayments?.items.length || 0}
        onChange={pageChangeHandler}
      />
    </div>
  )
}


