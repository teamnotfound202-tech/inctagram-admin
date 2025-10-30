'use client';

import s from './SettingsPage.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { UploadedPhotos } from '@/views/MoreInformations/SettingsPage/SettingPageItems/UploadedPhotos/UploadedPhotos'
import { Payments } from '@/views/MoreInformations/SettingsPage/SettingPageItems/Payments/Payments'
import { Followers } from '@/views/MoreInformations/SettingsPage/SettingPageItems/Followers/Followers'
import { SettingsNavLinks } from '@/views/MoreInformations/SettingsPage/SettingsNavLinks/SettingsNavLinks'
import { Following } from '@/views/MoreInformations/SettingsPage/SettingPageItems/Following/Following'

export const SettingsPage = () => {
  const searchParams = useSearchParams()
  const path = searchParams.get('part')
  const success = searchParams.get('success')
  const router = useRouter()
  useEffect(() => {
    if(path){
      router.replace(`?part=${path}${success ? `&success=${success}`:''}`)
    } else {
      router.replace('?part=uploaded-photos')
    }
  },[router,path,success])

  return (
    <div className={s.settingsPage}>
      <SettingsNavLinks />
        {path === 'uploaded-photos' && <UploadedPhotos/>}
        {path === 'payments' && <Payments/>}
        {path === 'followers' && <Followers/>}
        {path === 'following' && <Following/>}
    </div>
  )
}