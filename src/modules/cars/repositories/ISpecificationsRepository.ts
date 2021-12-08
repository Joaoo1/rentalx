import { Specification } from '../models/Specification';

interface ICreateSpecificationDto {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  // list(): Specification[];
  findByName(name: string): Specification | undefined;
  create({ name, description }: ICreateSpecificationDto): void;
}

export { ISpecificationsRepository, ICreateSpecificationDto };
