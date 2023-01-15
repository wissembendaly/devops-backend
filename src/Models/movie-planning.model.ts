import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Base } from "src/generics/db/base.model";
import { IsNotEmpty, IsNumber } from "class-validator";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";
import { Cinema } from "./cinema.model";

@Schema({ timestamps: true, versionKey: false })
export class MoviePlanning extends Base {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.Date })
  start: Date;

  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.Date })
  end: Date;

  @IsNumber()
  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.Number })
  movieId: number;

  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Cinema" })
  cinema: Cinema;
}

export const MoviePlanningSchema =
  SchemaFactory.createForClass(MoviePlanning).plugin(softDeletePlugin);
