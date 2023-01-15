import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AuthenticationModule } from "src/authentication/authentication.module";
import { MailModule } from "src/mail/mail.module";
import {
  EmailChangementAttempt,
  EmailChangementAttemptSchema
} from "src/Models/email-changement-attempt.model";
import {
  PasswordChangementAttempt,
  PasswordChangementAttemptSchema
} from "src/Models/password-changement-attempt.model";
import { User, UserSchema } from "src/Models/user.model";
import { AccountsController } from "./controllers/accounts.controller";
import { AccountsService } from "./services/accounts.service";
import { EmailChangementAttemptService } from "./services/email-changement-attempt.service";
import { PasswordChangementAttemptService } from "./services/password-changement-attempt.service";

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: PasswordChangementAttempt.name,
        schema: PasswordChangementAttemptSchema
      },
      {
        name: EmailChangementAttempt.name,
        schema: EmailChangementAttemptSchema
      }
    ]),
    MailModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 86400
      }
    })
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    PasswordChangementAttemptService,
    EmailChangementAttemptService
  ]
})
export class AccountsModule {}
