import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO copy';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined> {
    return this.usersTokens.find(
      token => token.userId === userId && token.refreshToken === refreshToken
    );
  }

  async findByRefreshToken(
    refreshToken: string
  ): Promise<UserToken | undefined> {
    return this.usersTokens.find(token => token.refreshToken === refreshToken);
  }

  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex(token => token.id === id);

    if (index !== -1) {
      this.usersTokens.splice(index, 1);
    }
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const token = new UserToken();

    Object.assign(token, data);

    this.usersTokens.push(token);

    return token;
  }
}

export { UsersTokensRepositoryInMemory };
