import { PickType } from "@nestjs/mapped-types";
import { Cinema } from "src/Models/cinema.model";
import { getTimeFromTimezone } from "src/utilities/time";

export class CinemaListItem extends PickType(Cinema, [
  "_id",
  "name",
  "description",
  "imageUrl"
]) {
  isOpen: boolean = true;
  imageUrl: string = "";
  constructor(cinema: Cinema) {
    super();

    this._id = cinema._id;
    this.name = cinema.name;
    this.description = cinema.description;
    this.imageUrl = cinema.imageUrl;

    const currentTime: string = getTimeFromTimezone("Africa/Tunis"); // the tunisian time
    this.isOpen =
      currentTime > cinema.openingTime && currentTime < cinema.closingTime;
  }
}
