import { OmitType } from "@nestjs/mapped-types";
import { Cinema } from "src/Models/cinema.model";

export class CreateCinemaDto extends OmitType(Cinema, ["_id"]) {}
