import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider // @inject('MailProvider') // private readonly mailProvider: IMailProvider
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError('Token invalid');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expiresAt,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError('Token is expired');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('User not exists');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
