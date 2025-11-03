'use client'

import ArrowBack from './icons/ArrowBack.svg'
import s from './UserInformation.module.scss'
import { SettingsPage } from '@/views/MoreInformations/SettingsPage/SettingsPage'
import { Avatar } from '@/shared/ui/Avatar'
import { Path } from '@/shared/config'
import Link from 'next/link'


export const UserInformation = () => {
  return (
    <div className={s.container}>
      <Link className={s.btn} href={Path.UsersList}>
        <ArrowBack />
        <span className={s.arrowText}>Back to Sign Up</span>
      </Link>

      <div className={s.userProfile}>
        <div className={s.wrapperProfile}>
          <Avatar alt={'A'} size={'medium'} />
          <div className={s.userNameProfile}>
            <div className={s.userFName}>{'user.name'}</div>
            <div className={s.userLName}>{'user.name'}</div>
          </div>
        </div>

        <div className={s.userInfo}>
          <div>
            <div className={s.userIdAndDate}>{'UserID'}</div>
            <div>21331QErQe21</div>
          </div>
          <div>
            <div className={s.userIdAndDate}>{'Profile Creation Date'}</div>
            <div>12.12.2022</div>
          </div>
        </div>
      </div>
      <div>
        <SettingsPage />
      </div>

    </div>
  )
}
