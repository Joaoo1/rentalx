import { Specification } from '../entities/Specification';

interface ICreateSpecificationDto {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  // list(): Specification[];
  findByName(name: string): Promise<Specification | undefined>;
  create({ name, description }: ICreateSpecificationDto): Promise<void>;
}

export { ISpecificationsRepository, ICreateSpecificationDto };
