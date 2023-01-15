import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { EmailConfirmationService } from "../services/email-confirmation.service";
import { AuthenticationResponseDto } from "../dto/login-response.dto";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { AuthenticationService } from "../services/authentication.service";
import { AuthGuard } from "@nestjs/passport";
import { RoleAuthGuard } from "src/guards/role-auth.guard";
import { Role } from "src/decorators/role-metadata.decorator";
import { User, UserRoleEnum } from "src/Models/user.model";
import { GetUser } from "src/decorators/get-user.decorator";
@Controller()
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  @Post("login")
  public async login(
    @Body() loginData: LoginDto
  ): Promise<AuthenticationResponseDto> {
    const response: AuthenticationResponseDto =
      await this.authenticationService.login(loginData);
    return response;
  }

  @Post("signup")
  public async signup(
    @Body() data: RegisterDto
  ): Promise<AuthenticationResponseDto> {
    const response = await this.authenticationService.register(data);
    return response;
  }

  @Role(UserRoleEnum.user)
  @UseGuards(AuthGuard("jwt"), RoleAuthGuard)
  @Post("confirm")
  public async confirmEmail(
    @Body() params: AuthenticationResponseDto
  ): Promise<any> {
    const { token } = params;
    return await this.emailConfirmationService.confirmEmail(token);
  }

  @UseGuards(AuthGuard("jwt"), RoleAuthGuard)
  @Role(UserRoleEnum.user)
  @Get("resend-confirmation-link")
  public async resendConfirmationLink(@GetUser() user: User): Promise<any> {
    await this.emailConfirmationService.resendEmailConfirmation(user);
    return {
      message: "You now received an email with a link to verify your account"
    };
  }
}
