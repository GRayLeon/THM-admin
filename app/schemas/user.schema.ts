import { z } from 'zod'

export const createUserSchema = z.object({
  account: z
    .string()
    .min(3, '帳號至少 3 字')
    .max(50, '帳號最多 50 字'),

  password: z
    .string()
    .min(6, '密碼至少 6 字')
    .max(100, '密碼最多 100 字'),

  roleCode: z
    .string()
    .min(1, '請選擇角色')
})

export const updateUserSchema = z.object({
  roleCode: z.string().optional(),
  password: z.string().min(6).max(100).or(z.literal('')).optional()
}).refine(
  data => data.roleCode || data.password,
  {
    message: '至少需要提供角色或密碼其中一項'
  }
)