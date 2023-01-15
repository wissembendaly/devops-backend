import { IsUrl } from "class-validator";

export class CinemaImageDto {
  @IsUrl()
  imageUrl: string;

  constructor(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
}
