import { AbstractEntity } from 'src/utils/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'entries' })
export class Entry extends AbstractEntity<Entry> {
  @Column()
  productId: number;

  @Column()
  userId: number;
}
