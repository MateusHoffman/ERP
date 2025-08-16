import { prisma } from '../../config/database';

export const findUserByEmail = async (email: string) =>
  prisma.user.findUnique({ where: { email } });
