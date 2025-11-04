'use client'
import s from './LoginForm.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertToast, Input } from '@/shared/ui'
import { Button } from '@/shared/ui'
import { useForm } from 'react-hook-form'
import { useId } from 'react'
import { type LoginFormData, loginSchema } from '@/shared/lib'
import { useLogInMutation } from '@/views/LoginPage/api/login.generated'
import { Path } from '@/shared/config'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })
  const [login, {loading}] = useLogInMutation()
  const router = useRouter()

  const emailId = useId()
  const passwordId = useId()

  const onSubmit = ({email,password}: LoginFormData) => {
    login({variables:{email,password}})
      .then((res)=>{
        if (res.data){
          const isLogged = res.data.loginAdmin.logged
          sessionStorage.setItem('isLogged', JSON.stringify(isLogged))

          if(isLogged){
            const logged = `${email}:${password}`
            const token = btoa(logged)
            sessionStorage.setItem('token', token)
            router.replace(Path.UsersList)
          } else {
            router.replace(Path.SignIn)
            toast.custom(() => (
              <AlertToast variant="error" title='Ошибка доступа' description='У вас нет прав доступа на эту страницу' />
            ))
          }
        }
      })
  }

  const error = errors.email?.message || errors.password?.message
  const disabled = isSubmitting || !!error || loading

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nativeOnBlur = register('email').onBlur
    if (nativeOnBlur) {
      nativeOnBlur(e)
    }
    await trigger('email')
  }

  console.log(errors)
  return (
    <div className={s.containerForm}>
      <h1 className={s.registrationFormTitle}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          id={'email' + emailId}
          type="email"
          label="Email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register('email')}
          onBlur={handleEmailBlur}
          autoComplete={'on'}
        />

        <Input
          id={'password' + passwordId}
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" disabled={disabled} className={s.signInButton}>
          {isSubmitting ? 'Loading...' : 'Sign In'}
        </Button>
      </form>
    </div>
  )
}
