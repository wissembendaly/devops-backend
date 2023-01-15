import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class VerificationCodeRequestDto {
  @IsNotEmpty({ message: "A verification Code is required" })
  @IsNumber()
  @Min(10000, {
    message: "A verification code of 5 digits minimum is required"
  })
  @Max(99999, {
    message: "A verification code of 5 digits at most is required"
  })
  verificationCode: number;
  constructor() {
    this.verificationCode = 0;
  }
}
