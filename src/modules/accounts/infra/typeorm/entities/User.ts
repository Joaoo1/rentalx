import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  avatar!: string;

  @Column()
  password!: string;

  @Column({ name: 'driver_license' })
  driverLicense!: string;

  @Column({ name: 'is_admin' })
  isAdmin!: boolean;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
