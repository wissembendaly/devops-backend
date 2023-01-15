import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "src/Models/user.model";

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private readonly reflactor: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user: User = context.switchToHttp().getRequest().user;
    const userRole: string = user.role;
    const methodRoles: string[] = this.reflactor.get(
      "role",
      context.getHandler()
    );
    return methodRoles.includes(userRole);
  }
}
