import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO copy';
import { UserToken } from '../infra/typeorm/entities/UserToken';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | undefined>;
  findByRefreshToken(refreshToken: string): Promise<UserToken | undefined>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
