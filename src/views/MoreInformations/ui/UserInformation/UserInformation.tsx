'use client'

import ArrowBack from './icons/ArrowBack.svg'
import s from './UserInformation.module.scss'
import { SettingsPage } from '@/views/MoreInformations/ui/SettingsPage/SettingsPage'
import { Avatar } from '@/shared/ui/Avatar'
import { Path } from '@/shared/config'
import Link from 'next/link'
import { useGetUserQuery } from '@/views/MoreInformations/api/getUser.generated'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { createUserLink } from '@/shared/lib/utils/createUserLink'

export const UserInformation = () => {
  const params = useSearchParams()
  const [id] = useState(Number(params.get('userId')))

  const { data } = useGetUserQuery({ variables: { userId: id } })

  console.log(data)

  return (
    <div className={s.container}>
      <Link className={s.btn} href={Path.UsersList}>
        <ArrowBack />
        <span className={s.arrowText}>Back to Sign Up</span>
      </Link>

      <div className={s.userProfile}>
        <div className={s.wrapperProfile}>
          <Avatar alt={'A'} size={'medium'} src={data?.getUser.profile.avatars?.[0]?.url} />
          <div className={s.userNameProfile}>
            <div className={s.userFName}>{data?.getUser.userName}</div>
            <div className={s.userLName}>{createUserLink(data?.getUser.email ?? '')}</div>
          </div>
        </div>

        <div className={s.userInfo}>
          <div>
            <div className={s.userIdAndDate}>{'UserID'}</div>
            <div>{data?.getUser.id}</div>
          </div>
          <div>
            <div className={s.userIdAndDate}>{'Profile Creation Date'}</div>
            <div>{new Date(data?.getUser.createdAt ?? '').toLocaleDateString('ru')}</div>
          </div>
        </div>
      </div>
      <div>
        <SettingsPage userId={id} />
      </div>
    </div>
  )
}
