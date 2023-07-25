import { AbstractEntity } from 'src/utils/abstract.entity';
import { Category } from 'src/resources/categories/entities/category.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'products' })
export class Product extends AbstractEntity<Product> {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  image: string;

  @Column({nullable: true})
  winner: boolean;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
