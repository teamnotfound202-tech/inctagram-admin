'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Path } from '@/shared/config'


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isLogged = sessionStorage.getItem('isLogged')
    if (!isLogged) {
      router.replace(Path.SignIn)
    } else {
      router.replace(Path.UsersList)
    }
  }, [router])

  return null
}
