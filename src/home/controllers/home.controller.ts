import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/decorators/get-user.decorator";
import { Role } from "src/decorators/role-metadata.decorator";
import { RoleAuthGuard } from "src/guards/role-auth.guard";
import { User, UserRoleEnum } from "src/Models/user.model";
import { sendEmailAdminRequestDto } from "../dto/send-email-admin-request.dto";
import { HomeService } from "../services/home.service";

@Controller("home")
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get("/admins")
  getAllAdmins(): Promise<User[]> {
    return this.homeService.listAdmins();
  }

  @Post("admins/contact")
  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  @UseGuards(AuthGuard("jwt"), RoleAuthGuard)
  sendEmailsToAdmins(
    @Body() payload: sendEmailAdminRequestDto,
    @GetUser() currentUser: User
  ): Promise<any> {
    return this.homeService.sendEmailsToAdmins(payload, currentUser);
  }
}
