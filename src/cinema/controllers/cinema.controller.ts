import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join } from "path";
import { Role } from "src/decorators/role-metadata.decorator";
import { Cinema } from "src/Models/cinema.model";
import { UserRoleEnum } from "src/Models/user.model";
import {
  cinemaImageName,
  imageFileFilter,
  uploadDestination
} from "../../utilities/upload";
import { RequestParamDto } from "../dtos/request/request-param.dto";
import { UpdateCinemaDto } from "../dtos/request/update-cinema.dto";
import { CinemaImageDto } from "../dtos/response/cinema-image.dto";
import { CinemaListItem } from "../dtos/response/cinema-list-item.dto";
import { CinemaService } from "../services/cinema.service";

// @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
@Controller("cinemas")
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  @Get(":id")
  async getCinema(@Param() params: RequestParamDto): Promise<Cinema> {
    const { id } = params;
    return this.cinemaService.findOne(id, {
      createdAt: 0,
      updatedAt: 0,
      deletedAt: 0,
      isDeleted: 0
    });
  }

  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  @Get()
  async listCinemas(): Promise<CinemaListItem[]> {
    return this.cinemaService.findAllCinemas();
  }

  // send old image in payload to mark it as disabled
  @Role(UserRoleEnum.admin)
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: join(uploadDestination, "uploads", "cinemas"),
        filename: cinemaImageName
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 10000000 // 10 MB
      }
    })
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File
  ): Promise<CinemaImageDto> {
    // We need to find a way to get the domain name/port of the server dynamically
    return new CinemaImageDto(
      `http://localhost:3000/uploads/cinemas/${file.filename}`
    );
  }

  @Role(UserRoleEnum.admin)
  @Post()
  async createCinema(@Body() cinema: Cinema) {
    return this.cinemaService.create(cinema);
  }

  @Role(UserRoleEnum.admin)
  @Put(":id")
  async updateCinema(
    @Param() params: RequestParamDto,
    @Body() cinema: UpdateCinemaDto
  ) {
    const { id } = params;
    return this.cinemaService.update(id, cinema);
  }

  @Role(UserRoleEnum.admin)
  @Delete(":id")
  async removeCinema(@Param("id") id: string) {
    return this.cinemaService.remove(id);
  }

  @Role(UserRoleEnum.admin)
  @Patch("restore/:id")
  async restoreCinema(@Param() params: RequestParamDto) {
    const { id } = params;
    return this.cinemaService.restore(id);
  }
}
