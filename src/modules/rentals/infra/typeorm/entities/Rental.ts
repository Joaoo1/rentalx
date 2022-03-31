import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id!: string;

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
