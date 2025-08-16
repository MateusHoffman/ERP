import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../../repository/auth/login.repository';
import { jwtConfig } from '../../config/jwt';

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Usuário não encontrado');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Senha incorreta');

  const token = jwt.sign({ id: user.id, role: user.role }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  return { token, user };
};
