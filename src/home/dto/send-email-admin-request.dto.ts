import { IsEmail, IsNotEmpty } from "class-validator";

export class sendEmailAdminRequestDto {
  @IsNotEmpty()
  @IsEmail()
  destination: string;
  @IsNotEmpty()
  message: string;
}
