import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../dtos/subscription.dto';
import { subscriptionService } from '../services/subscription.service';
import { AppError } from '../middleware/error.middleware';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    const subs = await subscriptionService.getAll(req.userId!);
    res.json(subs);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const sub = await subscriptionService.getById(req.params.id!, req.userId!);
    res.json(sub);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = CreateSubscriptionDto.safeParse(req.body);
    if (!result.success) throw new AppError(400, result.error.issues[0]?.message ?? 'Invalid input');
    const sub = await subscriptionService.create(req.userId!, result.data);
    res.status(201).json(sub);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const result = UpdateSubscriptionDto.safeParse(req.body);
    if (!result.success) throw new AppError(400, result.error.issues[0]?.message ?? 'Invalid input');
    const sub = await subscriptionService.update(req.params.id!, req.userId!, result.data);
    res.json(sub);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await subscriptionService.delete(req.params.id!, req.userId!);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
