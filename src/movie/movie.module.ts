import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Genre, GenreSchema } from "src/Models/tmdb/db/genre.model";
import { GenreController } from "./controllers/genre.controller";
import { MovieController } from "./controllers/movie.controller";
import { GenreService } from "./services/genre.service";
import { MovieService } from "./services/movie.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    HttpModule
  ],
  controllers: [MovieController, GenreController],
  providers: [MovieService, GenreService],
  exports: [MovieService]
})
export class MovieModule {}
