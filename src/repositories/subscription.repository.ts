import prisma from '../lib/prisma';
import type { CreateSubscriptionDtoType, UpdateSubscriptionDtoType } from '../dtos/subscription.dto';

export const subscriptionRepository = {
  findAll: (userId: string) =>
    prisma.subscription.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),

  findById: (id: string, userId: string) =>
    prisma.subscription.findFirst({ where: { id, userId } }),

  create: (userId: string, data: CreateSubscriptionDtoType) =>
    prisma.subscription.create({ data: { ...data, userId } }),

  update: (id: string, data: UpdateSubscriptionDtoType) =>
    prisma.subscription.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.subscription.delete({ where: { id } }),
};
