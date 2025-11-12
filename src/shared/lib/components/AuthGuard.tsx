'use client'

import { useRouter } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'
import { Path } from '@/shared/config'

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false
    const raw = sessionStorage.getItem('isLogged')
    return raw === 'true'
  })

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'isLogged') {
        setIsLoggedIn(e.newValue === 'true')
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    if (!isLoggedIn) return router.replace(Path.SignIn)
    if (isLoggedIn) return router.replace(Path.UsersList)
  }, [isLoggedIn, router])

  if (!isLoggedIn) return

  return <>{children}</>
}
