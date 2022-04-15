import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub: userId } = verify(
      token,
      auth.secretRefreshToken
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exists');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: userId,
      expiresIn: auth.expiresInRefreshToken,
    });

    await this.usersTokensRepository.create({
      userId,
      refreshToken,
      expiresAt: this.dateProvider.addDays(auth.expiresInRefreshTokenDays),
    });

    return refreshToken;
  }
}

export { RefreshTokenUseCase };
