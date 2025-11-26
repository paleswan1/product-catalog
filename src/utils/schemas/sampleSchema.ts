import { z } from 'zod';

export const SampleSchema = z.object({
  is_enabled: z.boolean().default(true),

  name: z
    .string()
    .trim()
    .min(1, { message: 'Full name is required' })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Name can only contain letters and spaces',
    }),

  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),

  address: z.string().trim().min(1, { message: 'Address is required' }),

  phone_number: z
    .string()
    .trim()
    .min(1, { message: 'Phone number is required' })
    .length(10, { message: 'Phone number must be exactly 10 digits' })
    .regex(/^\d{10}$/, { message: 'Phone number must contain only digits' }),

  opening_hours: z
    .string()
    .trim()
    .min(1, { message: 'Opening hours is required' }),

  closing_hours: z
    .string()
    .trim()
    .min(1, { message: 'Closing hours is required' }),

  lng: z.coerce.number().refine((val) => !isNaN(val), {
    message: 'Longitude is required',
  }),
  lat: z.coerce.number().refine((val) => !isNaN(val), {
    message: 'Latitude is required',
  }),
});
