import { PickType } from "@nestjs/mapped-types";
import { User } from "src/Models/user.model";

export class AccountUpdateRequestDto extends PickType(User, [
  "username",
  "firstname",
  "lastname",
  "gender",
  "birthday",
  "quote"
]) {}
