import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailUpdateRequestDto {
  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
