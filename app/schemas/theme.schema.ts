import { z } from 'zod'

export const updateThemeSchema = z.array(
  z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    sortOrder: z.number().optional(),
    description: z.string().nullable().optional(),
    imageUrl: z.string().nullable().optional()
  })
)