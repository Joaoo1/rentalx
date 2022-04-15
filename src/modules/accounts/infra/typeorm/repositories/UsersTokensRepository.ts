import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO copy';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    expiresAt,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expiresAt,
      refreshToken,
      userId,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined> {
    return this.repository.findOne({ userId, refreshToken });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { UsersTokensRepository };
