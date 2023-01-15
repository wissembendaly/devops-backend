import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { MailModule } from "src/mail/mail.module";
import { User, UserSchema } from "src/Models/user.model";
import { AuthenticationController } from "./controllers/authentication.controller";
import { AuthenticationService } from "./services/authentication.service";
import { EmailConfirmationService } from "./services/email-confirmation.service";
import { UserService } from "./services/user.service";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 86400
      }
    }),
    MailModule
  ],
  controllers: [AuthenticationController],
  providers: [
    UserService,
    AuthenticationService,
    EmailConfirmationService,
    JwtStrategy
  ],
  exports: [UserService, AuthenticationService]
})
export class AuthenticationModule {}
