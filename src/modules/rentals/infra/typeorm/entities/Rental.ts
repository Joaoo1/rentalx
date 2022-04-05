import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car!: Car;

  @Column({ name: 'car_id' })
  carId!: string;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'start_date' })
  startDate!: Date;

  @Column({ name: 'end_date' })
  endDate!: Date;

  @Column({ name: 'expected_return_date' })
  expectedReturnDate!: Date;

  @Column()
  total!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
