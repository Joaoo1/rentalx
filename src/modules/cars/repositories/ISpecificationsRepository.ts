import { Specification } from '../infra/typeorm/entities/Specification';

interface ICreateSpecificationDto {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification | undefined>;
  create({ name, description }: ICreateSpecificationDto): Promise<void>;
}

export { ISpecificationsRepository, ICreateSpecificationDto };
