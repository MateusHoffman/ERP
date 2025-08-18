import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '@repository/auth/login.repository';
import { jwtConfig } from '@config/jwt';

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Usuário não encontrado');

  const valid = await argon2.verify(user.password, password);
  if (!valid) throw new Error('Senha incorreta');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    jwtConfig.secret as jwt.Secret,
    { expiresIn: jwtConfig.expiresIn as jwt.SignOptions['expiresIn'] }
  );
  return { token, user };
};
