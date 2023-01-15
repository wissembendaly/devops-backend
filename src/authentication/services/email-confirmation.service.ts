import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EmailConfirmationTokenPayloadDto } from "src/authentication/dto/confirmation-mail-token.dto";
import { User } from "src/Models/user.model";
import { UserService } from "./user.service";
import { MailService } from "../../mail/mail.service";
import { EmailConfirmationPayloadDto } from "../dto/email-confirmation-payload.dto";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserService,
    private readonly mailService: MailService,
    private readonly authService: AuthenticationService
  ) {}

  public async confirmEmail(token: string): Promise<any> {
    const email = await this.decodeEmailfromToken(token);
    const user: User = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException({
        message: "Token does not match an existing user"
      });
    }
    if (user.activated)
      throw new BadRequestException({ message: "Account already activated" });
    user.activated = true;
    const newUser: User = await this.userRepository.update(user._id, user);
    const newToken = this.authService.createJwtToken(newUser).token;
    return { message: "Email Confirmed Successfully", token: newToken };
  }

  public async decodeEmailfromToken(token: string): Promise<string> {
    try {
      const payload: EmailConfirmationTokenPayloadDto =
        await this.jwtService.verify(token);
      return payload.email;
    } catch (error) {
      if (error?.name === "TokenExpiredError")
        throw new BadRequestException("Email Confirmation Token Expired");
      throw new BadRequestException("Bad Token Provided");
    }
  }

  public async resendEmailConfirmation(user: User): Promise<void> {
    if (user.activated) {
      throw new BadRequestException("UserAlready activated");
    }
    const { username, firstname, lastname } = user;
    const emailPayload: EmailConfirmationPayloadDto = {
      username,
      firstname,
      lastname
    };
    await this.mailService.mailConfirmation(emailPayload, user.email);
  }
}
