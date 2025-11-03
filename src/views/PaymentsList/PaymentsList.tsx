'use client'

import s from './PaymentsList.module.scss'
import {
  Avatar, CustomCheckbox,
  Input,
  SuperPagination,
  Table,
  TableBody,
  TableDataCell,
  TableH,
  TableHead,
  TableRow,
} from '@/shared/ui'
import { ISOStringFormat } from 'date-fns'
import { useState } from 'react'
import { SortButton } from '@/shared/ui/SortButton/SortButton'

type Avatar = {
  url: string
}
type PaymentMethod = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD'
type SubscriptionType = 'MONTHLY' | 'DAY' | 'WEEKLY'

type SubscriptionPaymentsModel = {
  id: number
  userId: number
  paymentMethod: PaymentMethod
  amount: number
  createdAt: ISOStringFormat
  type: SubscriptionType
  userName: string
  avatars: Avatar[]
}

type PaymentsPaginationModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: SubscriptionPaymentsModel[]
}

export const PaymentsList = () => {
  //Тестовые данные
  const paymentsList: PaymentsPaginationModel = {
    'totalCount': 126,
    'pagesCount': 13,
    'page': 1,
    'pageSize': 10,
    'items': [
      {
        'id': 174,
        'userId': 7,
        'userName': 'offtotheraces7',
        'amount': 50,
        'paymentMethod': 'STRIPE',
        'type': 'WEEKLY',
        'createdAt': '2025-10-30T15:31:21.666Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ae9df8f-08a7-4726-bbab-06cd33916163_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/43f6f908-1173-4b2b-9529-1cb36e215353_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-45x45',
          },
        ],
      },
      {
        'id': 173,
        'userId': 7,
        'userName': 'offtotheraces7',
        'amount': 100,
        'paymentMethod': 'STRIPE',
        'type': 'MONTHLY',
        'createdAt': '2025-10-30T15:01:15.269Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ae9df8f-08a7-4726-bbab-06cd33916163_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/43f6f908-1173-4b2b-9529-1cb36e215353_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-45x45',
          },
        ],
      },
      {
        'id': 172,
        'userId': 7,
        'userName': 'offtotheraces7',
        'amount': 10,
        'paymentMethod': 'STRIPE',
        'type': 'DAY',
        'createdAt': '2025-10-30T14:49:32.839Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ae9df8f-08a7-4726-bbab-06cd33916163_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/43f6f908-1173-4b2b-9529-1cb36e215353_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-45x45',
          },
        ],
      },
      {
        'id': 170,
        'userId': 7,
        'userName': 'offtotheraces7',
        'amount': 50,
        'paymentMethod': 'STRIPE',
        'type': 'WEEKLY',
        'createdAt': '2025-10-30T10:18:00.712Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ae9df8f-08a7-4726-bbab-06cd33916163_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/43f6f908-1173-4b2b-9529-1cb36e215353_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-45x45',
          },
        ],
      },
      {
        'id': 169,
        'userId': 7,
        'userName': 'offtotheraces7',
        'amount': 10,
        'paymentMethod': 'STRIPE',
        'type': 'DAY',
        'createdAt': '2025-10-29T17:15:12.796Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ae9df8f-08a7-4726-bbab-06cd33916163_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/43f6f908-1173-4b2b-9529-1cb36e215353_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-45x45',
          },
        ],
      },
      {
        'id': 168,
        'userId': 7,
        'userName': 'offtotheraces7',
        'amount': 10,
        'paymentMethod': 'STRIPE',
        'type': 'DAY',
        'createdAt': '2025-10-29T17:12:28.073Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ae9df8f-08a7-4726-bbab-06cd33916163_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/43f6f908-1173-4b2b-9529-1cb36e215353_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-45x45',
          },
        ],
      },
      {
        'id': 167,
        'userId': 7,
        'userName': 'offtotheraces7',
        'amount': 10,
        'paymentMethod': 'STRIPE',
        'type': 'DAY',
        'createdAt': '2025-10-29T17:10:13.033Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ae9df8f-08a7-4726-bbab-06cd33916163_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/43f6f908-1173-4b2b-9529-1cb36e215353_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-45x45',
          },
        ],
      },
      {
        'id': 166,
        'userId': 7,
        'userName': 'offtotheraces7',
        'amount': 10,
        'paymentMethod': 'STRIPE',
        'type': 'DAY',
        'createdAt': '2025-10-29T16:48:51.557Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ae9df8f-08a7-4726-bbab-06cd33916163_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/43f6f908-1173-4b2b-9529-1cb36e215353_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-45x45',
          },
        ],
      },
      {
        'id': 164,
        'userId': 73,
        'userName': 'tehnoroboty1',
        'amount': 0,
        'paymentMethod': 'STRIPE',
        'type': 'DAY',
        'createdAt': '2025-10-29T14:11:17.353Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/51355f86-bad9-4ef1-a23a-3d8c1244f1ee_users/73/avatar/4cc4b7a7-9a23-4e45-9720-1a4f5682f7eb-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/74f97e23-d32d-4068-ac97-7479ebc61a71_users/73/avatar/4cc4b7a7-9a23-4e45-9720-1a4f5682f7eb-images-45x45',
          },
        ],
      },
      {
        'id': 163,
        'userId': 73,
        'userName': 'tehnoroboty1',
        'amount': 0,
        'paymentMethod': 'STRIPE',
        'type': 'DAY',
        'createdAt': '2025-10-29T10:56:10.529Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/51355f86-bad9-4ef1-a23a-3d8c1244f1ee_users/73/avatar/4cc4b7a7-9a23-4e45-9720-1a4f5682f7eb-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/74f97e23-d32d-4068-ac97-7479ebc61a71_users/73/avatar/4cc4b7a7-9a23-4e45-9720-1a4f5682f7eb-images-45x45',
          },
        ],
      },
      {
        'id': 162,
        'userId': 7,
        'userName': 'offtotheraces7',
        'amount': 10,
        'paymentMethod': 'STRIPE',
        'type': 'DAY',
        'createdAt': '2025-10-29T16:48:51.557Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/6ae9df8f-08a7-4726-bbab-06cd33916163_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/43f6f908-1173-4b2b-9529-1cb36e215353_users/7/avatar/2519ea99-3131-4b18-ac2c-5255f7eb3fba-images-45x45',
          },
        ],
      },
      {
        'id': 161,
        'userId': 73,
        'userName': 'tehnoroboty1',
        'amount': 0,
        'paymentMethod': 'STRIPE',
        'type': 'DAY',
        'createdAt': '2025-10-29T14:11:17.353Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/51355f86-bad9-4ef1-a23a-3d8c1244f1ee_users/73/avatar/4cc4b7a7-9a23-4e45-9720-1a4f5682f7eb-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/74f97e23-d32d-4068-ac97-7479ebc61a71_users/73/avatar/4cc4b7a7-9a23-4e45-9720-1a4f5682f7eb-images-45x45',
          },
        ],
      },
      {
        'id': 160,
        'userId': 73,
        'userName': 'tehnoroboty1',
        'amount': 0,
        'paymentMethod': 'STRIPE',
        'type': 'DAY',
        'createdAt': '2025-10-29T10:56:10.529Z' as ISOStringFormat,
        'avatars': [
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/51355f86-bad9-4ef1-a23a-3d8c1244f1ee_users/73/avatar/4cc4b7a7-9a23-4e45-9720-1a4f5682f7eb-images-192x192',
          },
          {
            'url': 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/74f97e23-d32d-4068-ac97-7479ebc61a71_users/73/avatar/4cc4b7a7-9a23-4e45-9720-1a4f5682f7eb-images-45x45',
          },
        ],
      },
    ],
  }

  const [page, setPage] = useState(1)
  const [itemsCount, setItemsCount] = useState(10)

  const pageChangeHandler = (page: number, count: number) => {
    setPage(page)
    setItemsCount(count)
  }
  const shownPaymentsList = []
  let i: number = (page - 1) * itemsCount
  if (paymentsList) {
    //берем из пришедшего массива оплат только нужную порцию, чтобы отрисовать
    while (i <= page * itemsCount - 1 && i < paymentsList.items.length) {
      shownPaymentsList.push(
        <TableRow key={paymentsList.items[i].id}>
          <TableDataCell className={s.fullNameUser}>
            <Avatar src={paymentsList.items[i].avatars[1].url} alt={'avatar'} />
            {paymentsList.items[i].userName}
          </TableDataCell>
          <TableDataCell>{new Date(paymentsList.items[i].createdAt).toLocaleDateString('ru')}</TableDataCell>
          <TableDataCell>$ {paymentsList.items[i].amount}</TableDataCell>
          <TableDataCell>{paymentsList.items[i].type}</TableDataCell>
          <TableDataCell>{paymentsList.items[i].paymentMethod}</TableDataCell>
        </TableRow>,
      )
      i++
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.autoUpdateWrapper}>
        <CustomCheckbox text={'Autoupdate'} id={'autoupdate'} checked/>
      </div>

      <div className={s.usersListPageTop}>
        <Input
          id={'inputSearch'}
          className={s.usersListSearchInput}
          type="search"
          placeholder={'Search'}
          onChange={() => {
          }}
          value={''}
        />
      </div>
      <Table className={s.usersTable}>
        <TableHead>
          <TableRow className={s.tableRow}>
            <TableH>
              <div className={s.table}>
                Full Name
                <SortButton />
              </div>
            </TableH>
            <TableH>
              <div className={s.table}>
                Date added
                <SortButton />
              </div>
            </TableH>
            <TableH>
              <div className={s.table}>
                Amount, $
                <SortButton />
              </div>
            </TableH>
            <TableH>Subscription</TableH>
            <TableH>
              <div className={s.table}>
                Payment Method
                <SortButton />
              </div>
            </TableH>
          </TableRow>
        </TableHead>
        <TableBody>{shownPaymentsList}</TableBody>
      </Table>
      <SuperPagination
        itemsCount={itemsCount}
        page={page}
        totalCount={paymentsList?.items.length || 0}
        onChange={pageChangeHandler}
      />
    </div>
  )
}

