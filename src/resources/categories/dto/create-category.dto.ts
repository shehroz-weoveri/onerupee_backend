import { IsNotEmpty } from 'class-validator';
import { CreateProductDto } from 'src/resources/products/dto/create-product.dto';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  icon: string;
  
  products: CreateProductDto[];
}
