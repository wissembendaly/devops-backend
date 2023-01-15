import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query
} from "@nestjs/common";
import { lastValueFrom } from "rxjs";

import { RequestParamDto } from "src/cinema/dtos/request/request-param.dto";
import { Role } from "src/decorators/role-metadata.decorator";
import { MoviePlanning } from "src/Models/movie-planning.model";
import { UserRoleEnum } from "src/Models/user.model";
import { ListResult } from "src/movie/dto/list-result";
import { Movie } from "src/movie/dto/movie";
import { ScrappedMoviePlanning } from "src/movie/dto/scrapped-movie-planning";
import { MovieService } from "src/movie/services/movie.service";
import { PlanningFiltersByMovie } from "../dtos/request/planning-filters-by-movie.dto";
import { PlanningFilters } from "../dtos/request/planning-filters.dto";
import { UpdatePlanningDto } from "../dtos/request/update-planning.dto";
import { PlanningService } from "../service/planning.service";
import { MovieDetails } from "src/movie/dto/movie-details";

// @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
@Controller("plannings")
export class PlanningController {
  constructor(
    private readonly planningService: PlanningService,
    private readonly movieService: MovieService
  ) {}

  @Get("bycinema")
  async listPlanningsByCinema(@Query() planningFilters: PlanningFilters) {
    const plannings = await this.planningService.findAll(
      {
        start: {
          $gte: planningFilters.start
        },
        end: {
          $lte: planningFilters.end
        },
        cinema: planningFilters.id
      },
      {
        createdAt: 0,
        updatedAt: 0,
        deletedAt: 0,
        isDeleted: 0
      }
    );

    const uniqueMovies = plannings
      .map((planning) => planning.movieId)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

    const promises: Promise<MovieDetails[]> = Promise.all(
      uniqueMovies.map((id) => {
        return lastValueFrom(this.movieService.getMovie(id));
      })
    );
    const moviesResults: MovieDetails[] = await promises;

    const alteredPlannings: any = [];
    plannings.forEach((planning: MoviePlanning) => {
      const index = uniqueMovies.findIndex((id) => id === planning.movieId);
      alteredPlannings.push({
        start: planning.start,
        end: planning.end,
        _id: planning._id,
        cinema: planning.cinema,
        movie: {
          id: planning.movieId,
          poster_path: moviesResults[index].poster_path,
          title: moviesResults[index].title
        }
      });
    });
    return alteredPlannings;
  }

  @Get("bymovie")
  async listPlanningsByMovie(
    @Query() planningFilters: PlanningFiltersByMovie
  ): Promise<MoviePlanning[]> {
    return this.planningService.findAll(
      {
        start: {
          $gte: planningFilters.start
        },
        end: {
          $lte: planningFilters.end
        },
        movieId: planningFilters.id
      },
      {
        createdAt: 0,
        updatedAt: 0,
        deletedAt: 0,
        isDeleted: 0
      },
      { path: "cinema", select: ["_id", "name", "imageUrl"] }
    );
  }

  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  @Get(":id")
  async getPlanning(@Param() params: RequestParamDto): Promise<MoviePlanning> {
    const { id } = params;
    return this.planningService.findOne(id, {
      createdAt: 0,
      updatedAt: 0,
      deletedAt: 0,
      isDeleted: 0
    });
  }

  @Role(UserRoleEnum.admin)
  @Post()
  async createPlanning(@Body() planning: MoviePlanning) {
    return this.planningService.create(planning);
  }

  @Role(UserRoleEnum.admin)
  @Put(":id")
  async updatePlanning(
    @Param() params: RequestParamDto,
    @Body() planning: UpdatePlanningDto
  ) {
    const { id } = params;
    return this.planningService.update(id, planning);
  }

  @Role(UserRoleEnum.admin)
  @Delete(":id")
  async removePlanning(@Param("id") id: string) {
    return this.planningService.remove(id);
  }

  @Role(UserRoleEnum.admin)
  @Patch("restore/:id")
  async restorePlanning(@Param() params: RequestParamDto) {
    const { id } = params;
    return this.planningService.restore(id);
  }

  @Put("setup")
  async setup(@Body() plannings: ScrappedMoviePlanning[]) {
    const uniqueMovies = plannings
      .map((planning) => planning.title)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    const promises = Promise.all(
      uniqueMovies.map((title) => {
        return lastValueFrom(this.movieService.search(title, 1));
      })
    );
    const moviesResults = await promises;
    const movies = moviesResults.map((movieResult: ListResult<Movie>) => {
      return movieResult.results[0];
    });

    const alteredPlannings = [];
    plannings.forEach((planning) => {
      const { title, ...attrs } = planning;

      const index = uniqueMovies.findIndex((movie) => movie === title);
      if (typeof movies[index] !== "undefined")
        alteredPlannings.push({
          ...attrs,
          movieId: movies[index].id,
          cinema: "620c3bb7c05f26828c613249"
        });
    });

    return this.planningService.bulkCreate(alteredPlannings);
  }
}
