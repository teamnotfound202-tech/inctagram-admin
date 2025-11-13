'use client';

import s from './SettingsPage.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { UploadedPhotos } from '@/views/MoreInformations/ui/SettingsPage/SettingPageItems/UploadedPhotos/ui/UploadedPhotos'
import { Payments } from '@/views/MoreInformations/ui/SettingsPage/SettingPageItems/Payments/Payments'
import { Followers } from '@/views/MoreInformations/ui/SettingsPage/SettingPageItems/Followers/Followers'
import { SettingsNavLinks } from '@/views/MoreInformations/ui/SettingsPage/SettingsNavLinks/SettingsNavLinks'
import { Following } from '@/views/MoreInformations/ui/SettingsPage/SettingPageItems/Following/Following'

type Props = {
  userId: number
}

export const SettingsPage = ({userId}:Props) => {
  const searchParams = useSearchParams()
  const path = searchParams.get('part')
  // const success = searchParams.get('success')
  const router = useRouter()

  useEffect(() => {
    if(!path){
      router.replace(`?part=uploaded-photos&&userId=${userId}`)
    }
  },[router,path,userId])
  // useEffect(() => {
  //   if(path){
  //     router.replace(`?part=${path}${success ? `&success=${success}`:''}`)
  //   } else {
  //     router.replace(`?part=uploaded-photos&&userId=${id}`)
  //   }
  // },[router,path,success,id])

  return (
    <div className={s.settingsPage}>
      <SettingsNavLinks />
        {path === 'uploaded-photos' && <UploadedPhotos userId={userId}/>}
        {path === 'payments' && <Payments userId={userId}/>}
        {path === 'followers' && <Followers userId={userId}/>}
        {path === 'following' && <Following userId={userId}/>}
    </div>
  )
}