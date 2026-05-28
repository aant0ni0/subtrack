import { z } from 'zod';

export const CreateSubscriptionDto = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().positive('Price must be greater than 0'),
  billingCycle: z.enum(['MONTHLY', 'YEARLY']),
  nextPaymentDate: z.coerce.date(),
  category: z.string().min(1, 'Category is required'),
  active: z.boolean().optional().default(true),
});

export const UpdateSubscriptionDto = CreateSubscriptionDto.partial();

export type CreateSubscriptionDtoType = z.infer<typeof CreateSubscriptionDto>;
export type UpdateSubscriptionDtoType = z.infer<typeof UpdateSubscriptionDto>;
