import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Base } from "src/generics/db/base.model";
import { IsNotEmpty, IsNumber, IsOptional, Matches } from "class-validator";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";
import { IsGreaterThan } from "src/decorators/match.decorator";

@Schema({ timestamps: true, versionKey: false })
export class Cinema extends Base {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.String })
  name: string;

  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.String })
  description: string;

  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.String })
  address: string;

  @IsOptional()
  @IsNumber()
  @Prop({ type: mongoose.Schema.Types.Number })
  phone: number;

  @Matches(/^(([01][0-9])|(2[0-3])):[0-5][0-9]$/)
  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.String })
  openingTime: string;

  @Matches(/^(([01][0-9])|(2[0-3])):[0-5][0-9]$/)
  @IsGreaterThan("openingTime", {
    message: "closing time must be greater than opening time"
  })
  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.String })
  closingTime: string;

  @IsOptional()
  @Prop()
  imageUrl: string;
}

export const CinemaSchema =
  SchemaFactory.createForClass(Cinema).plugin(softDeletePlugin);
