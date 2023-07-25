import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email.' })
  email: string;

  deviceId: string;
}
