import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  MoviePlanning,
  MoviePlanningSchema
} from "src/Models/movie-planning.model";
import { MovieModule } from "src/movie/movie.module";
import { PlanningController } from "./controllers/planning.controller";
import { PlanningService } from "./service/planning.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoviePlanning.name, schema: MoviePlanningSchema }
    ]),
    MovieModule
  ],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: [PlanningService]
})
export class PlanningModule {}
