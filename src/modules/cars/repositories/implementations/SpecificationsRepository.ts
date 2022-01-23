import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDto,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  private constructor() {
    this.repository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.repository.findOne({ name });
  }

  async create({ name, description }: ICreateSpecificationDto): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }
}

export { SpecificationsRepository };
