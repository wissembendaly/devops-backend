import { OmitType } from "@nestjs/mapped-types";
import { MoviePlanning } from "src/Models/movie-planning.model";

export class UpdatePlanningDto extends OmitType(MoviePlanning, [
  "deletedAt",
  "updatedAt",
  "createdAt",
  "isDeleted"
]) {}
