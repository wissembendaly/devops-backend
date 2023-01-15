import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { lastValueFrom } from "rxjs";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { BaseService } from "src/generics/services/base.service";
import { Genre } from "src/Models/tmdb/db/genre.model";
import { GenreDto } from "../dto/genre-dto";
import { MovieService } from "./movie.service";

@Injectable()
export class GenreService extends BaseService<Genre> {
  private movieService: MovieService;

  constructor(
    @InjectModel(Genre.name) model: SoftDeleteModel<Genre & Document>,
    movieService: MovieService
  ) {
    super(model);
    this.movieService = movieService;
  }

  /**
   * Checks the TMDB for changes in genres (for movies) and updates our db
   * @returns BulkWriteResult
   */
  async refreshMoviesGenres() {
    //lastValueFrom : return the latest observer result as a promise (we only get one result anyway)
    const genresDto: GenreDto[] = await lastValueFrom(
      this.movieService.getGenres()
    );
    const writeResult = await this.model.bulkWrite(
      genresDto.map((genre: GenreDto) => ({
        updateOne: {
          filter: { id: genre.id }, // select fields with this id
          update: { $set: { name: genre.name } }, // update the genre name
          upsert: true // create if it doesn't exist
        }
      }))
    );
    return writeResult;
  }
}
