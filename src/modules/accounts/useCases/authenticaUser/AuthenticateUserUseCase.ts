import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import auth from '@config/auth';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, auth.secretToken, {
      subject: user.id,
      expiresIn: auth.expiresInToken,
    });

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: user.id,
      expiresIn: auth.expiresInRefreshToken,
    });

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresAt: this.dateProvider.addDays(auth.expiresInRefreshTokenDays),
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  }
}

export { AuthenticateUserUseCase };
