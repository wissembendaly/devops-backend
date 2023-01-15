import { Module } from "@nestjs/common";
import { AuthenticationModule } from "src/authentication/authentication.module";
import { MailModule } from "src/mail/mail.module";
import { HomeController } from "./controllers/home.controller";
import { HomeService } from "./services/home.service";

@Module({
  imports: [AuthenticationModule, MailModule],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
