import { PrismaClient } from '@prisma/client';
import { CreateUserInput } from '@validator/users/createUser.validator';

const prisma = new PrismaClient();

export const createUserRepository = async (userData: CreateUserInput) => {
  return await prisma.user.create({
    data: userData
  });
};
