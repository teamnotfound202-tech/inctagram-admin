import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('The email must match the format example@example.com').min(1, 'Enter your email'),

  password: z
    .string()
    .min(1, 'Enter your password')
    .min(4, 'Minimum number of characters 4')
    .max(20, 'Maximum number of characters 20')
    .regex(/^[A-Za-z0-9]+$/, {
      message: 'Password must contain special characters',
    })
    .regex(/[a-z]/, 'Must contain lowercase letter (a-z)')
})

export type LoginInputs = z.infer<typeof loginSchema>

export const createNewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be at most 20 characters'),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: 'The passwords must match',
    path: ['passwordConfirmation'],
  })

export type CreateNewPasswordInputs = z.infer<typeof createNewPasswordSchema>
export type EmailInputType = Pick<LoginInputs, 'email'>
export type LoginFormData = z.infer<typeof loginSchema>
