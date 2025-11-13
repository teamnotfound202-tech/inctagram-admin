import { Metadata } from 'next'
import { AuthGuard } from '@/shared/lib'
import { LoginPage } from '@/views'

export const metadata: Metadata = { title: 'Login' }
// export { LoginPage as default } from '@/views'

export default function Page() {
  return (
    <AuthGuard>
      <LoginPage/>
    </AuthGuard>
  )
}
