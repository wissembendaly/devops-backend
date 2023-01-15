import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseService } from "src/generics/services/base.service";
import { Cinema } from "src/Models/cinema.model";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { CinemaListItem } from "../dtos/response/cinema-list-item.dto";

@Injectable()
export class CinemaService extends BaseService<Cinema> {
  constructor(
    @InjectModel(Cinema.name) model: SoftDeleteModel<Cinema & Document>
  ) {
    super(model);
  }

  async findAllCinemas(): Promise<CinemaListItem[]> {
    const cinemas: Cinema[] = await this.findAll(
      {},
      { name: 1, description: 1, openingTime: 1, closingTime: 1, imageUrl: 1 }
    );
    return cinemas.map((cinema) => new CinemaListItem(cinema));
  }
}
