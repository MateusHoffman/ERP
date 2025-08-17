import { createUserRepository } from '@repository/users/createUser.repository';
import argon2 from 'argon2';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const createUserService = async (userData: CreateUserData) => {
  const hashedPassword = await argon2.hash(userData.password);
  
  const user = await createUserRepository({
    ...userData,
    password: hashedPassword
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
};
