import { IsDateString, IsNotEmpty, IsNumberString } from "class-validator";

export class PlanningFiltersByMovie {
  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsDateString()
  @IsNotEmpty()
  start: Date;

  @IsDateString()
  @IsNotEmpty()
  end: Date;
}
