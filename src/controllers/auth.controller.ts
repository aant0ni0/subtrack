import { Router } from 'express';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { authService } from '../services/auth.service';
import { AppError } from '../middleware/error.middleware';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const result = RegisterDto.safeParse(req.body);
    if (!result.success) throw new AppError(400, result.error.issues[0]?.message ?? 'Invalid input');
    const user = await authService.register(result.data.email, result.data.password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const result = LoginDto.safeParse(req.body);
    if (!result.success) throw new AppError(400, result.error.issues[0]?.message ?? 'Invalid input');
    const token = await authService.login(result.data.email, result.data.password);
    res.json(token);
  } catch (err) {
    next(err);
  }
});

export default router;
