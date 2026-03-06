import { z } from 'zod'

export const updateIndexDataSchema = z.object({
  homeCarousel: z.array(z.any()).optional(),
  homeIntro: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  email: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional()
})