import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { BaseService } from "src/generics/services/base.service";
import { PasswordChangementAttempt } from "src/Models/password-changement-attempt.model";

@Injectable()
export class PasswordChangementAttemptService extends BaseService<PasswordChangementAttempt> {
  constructor(
    @InjectModel(PasswordChangementAttempt.name)
    model: SoftDeleteModel<PasswordChangementAttempt & Document>
  ) {
    super(model);
  }
  public async existsByUserId(userId: string): Promise<boolean> {
    const exists = (await this.model.findOne({ userId }).exec()) != null;
    return exists;
  }

  public async findByUserId(
    userId: string
  ): Promise<PasswordChangementAttempt> {
    const attempt: PasswordChangementAttempt = await this.model.findOne({
      userId
    });
    if (!attempt) {
      throw new NotFoundException("Attempt not Found");
    }
    return attempt;
  }
}
