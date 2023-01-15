import { User } from "src/Models/user.model";

export class AccountUpdateResponseDto {
  token = "";
  user: User = new User();
}
