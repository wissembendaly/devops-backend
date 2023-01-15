import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { EmailConfirmationPayloadDto } from "../authentication/dto/email-confirmation-payload.dto";
import { EmailConfirmationTokenPayloadDto } from "../authentication/dto/confirmation-mail-token.dto";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService
  ) {}
  async mailConfirmation(
    payload: EmailConfirmationPayloadDto,
    email: string
  ): Promise<void> {
    const tokenPayload: EmailConfirmationTokenPayloadDto = { email };
    const link = `${
      process.env.EMAIL_CONFIRMATION_URL
    }?token=${this.jwtService.sign(tokenPayload)}`;
    await this.mailerService.sendMail({
      to: email,
      subject: "Email Confirmation",
      template: "mail-confirmation.hbs",
      context: { ...payload, link }
    });
  }

  async sendPasswordChangementVerificationCode(
    email: string,
    verificationCode: number
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: "Email Confirmation",
      template: "password-changement.hbs",
      context: { verificationCode }
    });
  }

  async sendEmailChangementVerificationCode(
    email: string,
    verificationCode: number
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: "Email Confirmation",
      template: "email-changement.hbs",
      context: { verificationCode }
    });
  }

  async sendCustomEmail(
    email: string,
    message: string,
    from: string
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: "Opinion Coming from The WATCH NEAR APP",
      template: "user-opinion.hbs",
      context: { from, message }
    });
  }
}
