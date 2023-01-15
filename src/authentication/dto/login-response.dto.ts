import { IsJWT, IsNotEmpty } from "class-validator";
export class AuthenticationResponseDto {
  @IsNotEmpty({ message: "Token must not be empty" })
  @IsJWT({ message: "a valid jwt token is required" })
  token: string;
}
