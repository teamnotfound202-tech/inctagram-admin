'use client'
import { ReactNode } from 'react'
import { Container, Sidebar} from '@/shared/ui'

import dynamic from 'next/dynamic'
const AuthGuard = dynamic(() => import('@/shared/lib').then(res => res.AuthGuard), { ssr: false })


export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
        <Container>
          <div style={{width: '100%', display: 'flex'}}>
            <Sidebar />
            {children}
          </div>
        </Container>
    </AuthGuard>
  )
}