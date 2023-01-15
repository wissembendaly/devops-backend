import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join } from "path";
import { GetUser } from "src/decorators/get-user.decorator";
import { Role } from "src/decorators/role-metadata.decorator";
import { RoleAuthGuard } from "src/guards/role-auth.guard";
import { User, UserRoleEnum } from "src/Models/user.model";
import {
  imageFileFilter,
  uploadDestination,
  userImageName
} from "src/utilities/upload";
import { AccountUpdateRequestDto } from "../dto/account-update-request.dto";
import { AccountUpdateResponseDto } from "../dto/account-update-response.dto";
import { EmailUpdateRequestDto } from "../dto/email-update-request.dto";
import { EmailUpdateResponseDto } from "../dto/email-update-response.dto";
import { PasswordUpdateRequestDto } from "../dto/password-update-request.dto";
import { PasswordUpdateResponseDto } from "../dto/password-update-response.dto";
import { VerificationCodeRequestDto } from "../dto/verification-code-request.dto";
import { VerificationCodeResponseDto } from "../dto/verification-code-response.dto";
import { AccountsService } from "../services/accounts.service";

@Controller("accounts")
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get("me")
  @UseGuards(AuthGuard("jwt"), RoleAuthGuard)
  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  me(@GetUser() user: User): User {
    return user;
  }

  @Put("me")
  @UseGuards(AuthGuard("jwt"), RoleAuthGuard)
  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  async updateMe(
    @Body() payload: AccountUpdateRequestDto,
    @GetUser() user: User
  ): Promise<AccountUpdateResponseDto> {
    return this.accountService.updateGeneralInfo(user, payload);
  }

  @Post("me/password")
  @UseGuards(AuthGuard("jwt"), RoleAuthGuard)
  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  async updatePasswordMe(
    @Body() payload: PasswordUpdateRequestDto,
    @GetUser() user: User
  ): Promise<PasswordUpdateResponseDto> {
    return this.accountService.updatePasswordPhaseOne(user, payload);
  }

  @Put("me/password/confirm")
  @UseGuards(AuthGuard("jwt"), RoleAuthGuard)
  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  async confirmUpdatePasswordMe(
    @Body() payload: VerificationCodeRequestDto,
    @GetUser() user: User
  ): Promise<VerificationCodeResponseDto> {
    return this.accountService.updatePasswordPhaseTwo(payload, user);
  }

  @Post("me/email")
  @UseGuards(AuthGuard("jwt"), RoleAuthGuard)
  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  async updateEmailMe(
    @Body() payload: EmailUpdateRequestDto,
    @GetUser() user: User
  ): Promise<EmailUpdateResponseDto> {
    return this.accountService.updateEmailPhaseOne(user, payload);
  }

  @Put("me/email/confirm")
  @UseGuards(AuthGuard("jwt"), RoleAuthGuard)
  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  async confirmUpdateEmailMe(
    @Body() payload: VerificationCodeRequestDto,
    @GetUser() user: User
  ): Promise<AccountUpdateResponseDto> {
    return this.accountService.updateEmailPhaseTwo(payload, user);
  }

  @Post("me/image")
  @UseGuards(AuthGuard("jwt"), RoleAuthGuard)
  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  @UseInterceptors(
    FileInterceptor("newImage", {
      storage: diskStorage({
        destination: join(uploadDestination, "uploads", "users"),
        filename: userImageName
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 10000000 // 10 MB
      }
    })
  )
  async updateImageMe(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File
  ): Promise<AccountUpdateResponseDto> {
    const imagePath = `http://localhost:3000/uploads/users/${file.filename}`;
    return this.accountService.updateProfileImage(user, imagePath);
  }
}
