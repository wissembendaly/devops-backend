import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus
} from "@nestjs/common";

import { Response } from "express";

@Catch(BadRequestException)
export class BadRequestExceptionFilter<BadRequestException>
  implements ExceptionFilter
{
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Credentials provided doesn't match an exisiting user"
    });
    return response;
  }
}
