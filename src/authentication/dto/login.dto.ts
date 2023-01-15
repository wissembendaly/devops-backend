import { IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  @MinLength(5, { message: "A password with 5 chars at least is required" })
  password: string;
}
