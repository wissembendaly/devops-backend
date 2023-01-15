import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Cinema, CinemaSchema } from "../Models/cinema.model";
import { CinemaController } from "./controllers/cinema.controller";
import { CinemaService } from "./services/cinema.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cinema.name, schema: CinemaSchema }])
  ],
  controllers: [CinemaController],
  providers: [CinemaService]
})
export class CinemaModule {}
