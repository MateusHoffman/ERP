import { createUserRepository } from '../../repository/users/createUser.repository';
import bcrypt from 'bcryptjs';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const createUserService = async (userData: CreateUserData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
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
