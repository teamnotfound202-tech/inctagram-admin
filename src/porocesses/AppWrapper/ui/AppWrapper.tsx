'use client'

import { type ReactNode, useState } from 'react'
import { Sidebar } from '@/shared/ui'
import s from './AppWrapper.module.scss'
import { Container } from '@/shared/ui'

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn] = useState(true)

  // useEffect(() => {
  //   if (typeof window !== 'undefined'){
  //     const isLogged = localStorage.getItem('isLogged')
  //     if (isLogged) {
  //       setIsLoggedIn(true)
  //     }
  //   }
  // },[isLoggedIn])

  return (
    <div className={s.appWrapper}>
      <Container>
        <div className={s.appInner}>
          {isLoggedIn && <Sidebar />}
          {children}
        </div>
      </Container>
    </div>
  )
}
