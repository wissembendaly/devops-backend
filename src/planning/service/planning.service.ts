import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseService } from "src/generics/services/base.service";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { MoviePlanning } from "src/Models/movie-planning.model";

@Injectable()
export class PlanningService extends BaseService<MoviePlanning> {
  constructor(
    @InjectModel(MoviePlanning.name)
    model: SoftDeleteModel<MoviePlanning & Document>
  ) {
    super(model);
  }

  bulkCreate(plannings: MoviePlanning[]) {
    const models = plannings.map((planning) => new this.model(planning));
    return this.model.bulkSave(models);
  }
}
