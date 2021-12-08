import { Specification } from '../models/Specification';
import {
  ICreateSpecificationDto,
  ISpecificationsRepository,
} from './implementations/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifations: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifations = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  findByName(name: string): Specification | undefined {
    const foundSpecification = this.specifations.find(s => s.name === name);
    return foundSpecification;
  }

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
