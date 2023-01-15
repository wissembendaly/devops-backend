import { IsDateString, IsNotEmpty } from "class-validator";
import { RequestParamDto } from "src/cinema/dtos/request/request-param.dto";

export class PlanningFilters extends RequestParamDto {
  @IsDateString()
  @IsNotEmpty()
  start: Date;

  @IsDateString()
  @IsNotEmpty()
  end: Date;
}
