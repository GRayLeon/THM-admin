import { z } from 'zod'

export const createRoleSchema = z.object({
  code: z
    .string()
    .min(2, '代號至少 2 字')
    .max(10, '代號最多 10 字'),

  name: z
    .string()
    .min(2, '名稱至少 2 字')
    .max(10, '名稱最多 10 字'),

  functions: z
    .array(z.string())
})

export const updateRoleSchema = z.object({
  functions: z
    .array(z.string())
})