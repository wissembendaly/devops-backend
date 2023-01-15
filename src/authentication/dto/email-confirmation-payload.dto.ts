import { PickType } from "@nestjs/mapped-types";
import { User } from "src/Models/user.model";

export class EmailConfirmationPayloadDto extends PickType(User, [
  "firstname",
  "lastname",
  "username"
]) {}
