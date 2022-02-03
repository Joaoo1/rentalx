import { getRepository, Repository } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  async create({
    name,
    email,
    driverLicense,
    password,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driverLicense,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
