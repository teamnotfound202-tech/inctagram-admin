'use client'

import { type ReactNode } from 'react'
import { Sidebar } from '@/shared/ui'
import s from './AppWrapper.module.scss'
import { Container } from '@/shared/ui'

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const data = { userId: '44' }

  return (
    <div className={s.appWrapper}>
      <Container>
        <div className={s.appInner}>
          {data?.userId && <Sidebar />}
          {children}
        </div>
      </Container>
    </div>
  )
}
