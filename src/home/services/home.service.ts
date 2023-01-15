import { Injectable } from "@nestjs/common";
import { UserService } from "src/authentication/services/user.service";
import { MailService } from "src/mail/mail.service";
import { User, UserRoleEnum } from "src/Models/user.model";
import { sendEmailAdminRequestDto } from "../dto/send-email-admin-request.dto";

@Injectable()
export class HomeService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  public async listAdmins(): Promise<User[]> {
    const admins: User[] = await this.userService.findAll({
      role: UserRoleEnum.admin
    });
    return admins;
  }

  public async sendEmailsToAdmins(
    payload: sendEmailAdminRequestDto,
    sender: User
  ): Promise<object> {
    const { destination, message } = payload;
    await this.mailService.sendCustomEmail(
      destination,
      message,
      sender.username
    );
    return { message: "Your Email has been sent to the admins. Thank You!" };
  }
}
