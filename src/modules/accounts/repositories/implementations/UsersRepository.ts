import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

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
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driverLicense,
      password,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
