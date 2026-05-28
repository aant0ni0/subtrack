import { subscriptionRepository } from '../repositories/subscription.repository';
import { AppError } from '../middleware/error.middleware';
import type { CreateSubscriptionDtoType, UpdateSubscriptionDtoType } from '../dtos/subscription.dto';

export const subscriptionService = {
  getAll: (userId: string) =>
    subscriptionRepository.findAll(userId),

  async getById(id: string, userId: string) {
    const sub = await subscriptionRepository.findById(id, userId);
    if (!sub) throw new AppError(404, 'Subscription not found');
    return sub;
  },

  create: (userId: string, data: CreateSubscriptionDtoType) =>
    subscriptionRepository.create(userId, data),

  async update(id: string, userId: string, data: UpdateSubscriptionDtoType) {
    await subscriptionService.getById(id, userId);
    return subscriptionRepository.update(id, data);
  },

  async delete(id: string, userId: string) {
    await subscriptionService.getById(id, userId);
    return subscriptionRepository.delete(id);
  },
};
