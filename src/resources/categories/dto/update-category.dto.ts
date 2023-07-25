import { IsEmail } from "class-validator";

export class UpdateCategoryDto {
    @IsEmail()
    email: string;
}