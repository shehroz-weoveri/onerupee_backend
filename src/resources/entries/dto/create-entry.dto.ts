import { IsNotEmpty } from 'class-validator';

export class CreateEntryDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  email: string;
}
