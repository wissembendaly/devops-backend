import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Base } from "src/generics/db/base.model";
import { IsNotEmpty, IsNumber } from "class-validator";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";

@Schema({ timestamps: true, versionKey: false })
export class Genre extends Base {
  _id: string;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ type: mongoose.Schema.Types.Number })
  id: number;

  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.String })
  name: string;
}

export const GenreSchema =
  SchemaFactory.createForClass(Genre).plugin(softDeletePlugin);
