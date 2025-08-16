import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const createUserRepository = async (userData: CreateUserData) => {
  return await prisma.user.create({
    data: userData
  });
};
