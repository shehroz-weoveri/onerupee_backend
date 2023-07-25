import { IsEmail } from 'class-validator';

export class UpdateProductDto {
  @IsEmail()
  email: string;
}
