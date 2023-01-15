import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors
} from "@nestjs/common";
import { Observable } from "rxjs";

import { ListResult } from "../dto/list-result";
import { Movie } from "../dto/movie";
import { MovieDetails } from "../dto/movie-details";
import { MovieService } from "../services/movie.service";

@Controller("movies")
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get("/search")
  search(
    @Query("query") query: string,
    @Query("page") page: number
  ): Observable<ListResult<Movie>> {
    return this.movieService.search(query, page);
  }
  @Get("top_rated")
  listTopRated(@Query("page") page = 1): Observable<ListResult<Movie>> {
    return this.movieService.listTopRated(page);
  }

  @Get("popular")
  listPopular(@Query("page") page = 1): Observable<ListResult<Movie>> {
    return this.movieService.listpopular(page);
  }

  @Get("upcoming")
  listUpcoming(@Query("page") page = 1): Observable<ListResult<Movie>> {
    return this.movieService.listUpcoming(page);
  }
  @Get(":id")
  getMovie(@Param("id") movieId: number): Observable<MovieDetails> {
    return this.movieService.getMovie(movieId);
  }
}
