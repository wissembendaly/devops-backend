import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/Models/user.model";

export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    return user as User;
  }
);
