import { AbstractEntity } from 'src/utils/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  balance: number;

  @Column({ nullable: true })
  deviceId: string;
}
