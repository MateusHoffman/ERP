import { createUserRepository } from '@repository/users/createUser.repository';
import { CreateUserInput } from '@validator/users/createUser.validator';
import argon2 from 'argon2';

export const createUserService = async (userData: CreateUserInput) => {
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
