import { AbstractEntity } from 'src/utils/abstract.entity';
import { Product } from 'src/resources/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class Category extends AbstractEntity<Category> {
  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];
}
