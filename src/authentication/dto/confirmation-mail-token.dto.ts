import { PickType } from "@nestjs/mapped-types";
import { User } from "src/Models/user.model";

export class EmailConfirmationTokenPayloadDto extends PickType(User, [
  "email"
]) {}
