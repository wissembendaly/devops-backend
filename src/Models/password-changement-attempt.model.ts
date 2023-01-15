import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";
import { Base } from "src/generics/db/base.model";

@Schema({ timestamps: true, versionKey: false })
export class PasswordChangementAttempt extends Base {
  _id?: string;
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Number, required: true })
  verificationCode: number;

  @Prop({ type: String, required: true })
  newPassword: string;

  constructor() {
    super();
    this.userId = "";
    this.verificationCode = 0;
    this.newPassword = "";
  }
}

export const PasswordChangementAttemptSchema = SchemaFactory.createForClass(
  PasswordChangementAttempt
).plugin(softDeletePlugin);
