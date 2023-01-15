import { IsNotEmpty, MinLength } from "class-validator";
import { Match } from "src/decorators/match.decorator";

export class PasswordUpdateRequestDto {
  @IsNotEmpty()
  @MinLength(5)
  currentPassword: string;
  @IsNotEmpty()
  @MinLength(5)
  newPassword: string;
  @IsNotEmpty()
  @MinLength(5)
  @Match("newPassword")
  confirmPassword: string;
}
