import { PickType } from "@nestjs/mapped-types";
import { IsNotEmpty, MinLength } from "class-validator";
import { User } from "src/Models/user.model";
import { Match } from "../../decorators/match.decorator";

export class RegisterDto extends PickType(User, [
  "username",
  "firstname",
  "lastname",
  "email",
  "password"
]) {
  @IsNotEmpty()
  @MinLength(5)
  @Match("password", {
    message: "Password confirmation does not match the password provided"
  })
  repeatedPassword: string;
}
