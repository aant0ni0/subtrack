import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import { AppError } from '../middleware/error.middleware';

const JWT_SECRET = process.env['JWT_SECRET']!;

export const authService = {
  async register(email: string, password: string) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new AppError(409, 'Email already in use');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.create(email, passwordHash);
    return { id: user.id, email: user.email, createdAt: user.createdAt };
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError(401, 'Invalid credentials');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new AppError(401, 'Invalid credentials');
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return { token };
  },
};
