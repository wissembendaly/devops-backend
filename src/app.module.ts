import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthenticationModule } from "./authentication/authentication.module";
import { CinemaModule } from "./cinema/cinema.module";
import { MailModule } from "./mail/mail.module";
import { AccountsModule } from "./accounts/accounts.module";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { uploadDestination } from "./utilities/upload";
import { MovieModule } from "./movie/movie.module";
import { PlanningModule } from "./planning/planning.module";
import { HomeModule } from "./home/home.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}.c5opi.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    ),
    AuthenticationModule,
    CinemaModule,
    MailModule,
    MovieModule,
    AccountsModule,
    PlanningModule,
    MulterModule.register({}), // File upload
    ServeStaticModule.forRoot({
      rootPath: uploadDestination
    }),
    HomeModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
