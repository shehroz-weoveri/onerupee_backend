import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email.' })
  email: string;
}
