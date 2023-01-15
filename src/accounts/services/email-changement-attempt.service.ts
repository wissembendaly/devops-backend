import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { BaseService } from "src/generics/services/base.service";
import { EmailChangementAttempt } from "src/Models/email-changement-attempt.model";

@Injectable()
export class EmailChangementAttemptService extends BaseService<EmailChangementAttempt> {
  constructor(
    @InjectModel(EmailChangementAttempt.name)
    model: SoftDeleteModel<EmailChangementAttempt & Document>
  ) {
    super(model);
  }

  public async existsByUserId(userId: string): Promise<boolean> {
    const exists = (await this.model.findOne({ userId }).exec()) != null;
    return exists;
  }

  public async findByUserId(userId: string): Promise<EmailChangementAttempt> {
    const attempt: EmailChangementAttempt = await this.model.findOne({
      userId
    });
    if (!attempt) {
      throw new NotFoundException("Attempt not Found");
    }
    return attempt;
  }
}
