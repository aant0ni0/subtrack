import prisma from '../lib/prisma';

export const userRepository = {
  findByEmail: (email: string) =>
    prisma.user.findUnique({ where: { email } }),

  create: (email: string, passwordHash: string) =>
    prisma.user.create({ data: { email, passwordHash } }),
};
