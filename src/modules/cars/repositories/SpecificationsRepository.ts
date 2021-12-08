import { Specification } from '../models/Specification';
import {
  ICreateSpecificationDto,
  ISpecificationsRepository,
} from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifations: Specification[];

  constructor() {
    this.specifations = [];
  }

  findByName(name: string): Specification | undefined {
    const foundSpecification = this.specifations.find(s => s.name === name);
    return foundSpecification;
  }

  // list(): Specification[] {
  //   throw new Error('Method not implemented.');
  // }

  create({ name, description }: ICreateSpecificationDto): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    this.specifations.push(specification);
  }
}

export { SpecificationsRepository };
