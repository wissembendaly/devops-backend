import { OmitType } from "@nestjs/mapped-types";
import { MoviePlanning } from "src/Models/movie-planning.model";

export class CreatePlanningDto extends OmitType(MoviePlanning, ["_id"]) {}
