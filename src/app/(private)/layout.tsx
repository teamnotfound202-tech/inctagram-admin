import { AuthGuard } from '@/shared/lib'
import { ReactNode } from 'react'
import { Container, Sidebar } from '@/shared/ui'

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