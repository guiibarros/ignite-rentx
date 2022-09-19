import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  // Passado automaticamente pelo insomnia na aba 'auth' o token bearer
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing.', 401); // Erro customizado
  }

  // Bearer saojo3-4j34r-i9r049dh
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '3ec4bedcab551f96573450f68236a641'
    ) as IPayload; // Verify lança uma exceção caso ocorra erro. Caso contrário, continua o fluxo

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists.', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token.', 401);
  }
}
