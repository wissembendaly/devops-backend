import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { plainToClassFromExist, plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { GenreDto } from "../dto/genre-dto";
import { ListResult } from "../dto/list-result";
import { Movie } from "../dto/movie";
import { MovieDetails } from "../dto/movie-details";

@Injectable()
export class MovieService {
  apiKey: string;
  baseUrl: string;
  defaultLanguage = "en-US";
  defaultParams: any;
  constructor(private httpService: HttpService) {
    this.apiKey = process.env.TMDB_API_KEY;
    this.baseUrl = process.env.TMDB_BASE_URL;
    this.defaultParams = {
      api_key: this.apiKey,
      language: this.defaultLanguage
    };
  }

  getMovie(movieId: number): Observable<MovieDetails> {
    return this.httpService
      .get<MovieDetails>(`${this.baseUrl}/movie/${movieId}`, {
        params: this.defaultParams
      })
      .pipe(
        map((response) => {
          return plainToInstance(MovieDetails, response.data);
        })
      );
  }

  getGenres(): Observable<GenreDto[]> {
    return this.httpService
      .get(`${this.baseUrl}/genre/movie/list`, {
        params: this.defaultParams
      })
      .pipe(
        map((response) => {
          return response.data.genres;
        })
      );
  }

  search(query: string, page = 1): Observable<ListResult<Movie>> {
    // nestjs will subscribe to this observer and return the result to the client
    // if there is an error it will propagate till it gets returned
    const params = { ...this.defaultParams, query, page };

    return this.httpService
      .get(`${this.baseUrl}/search/movie`, { params })
      .pipe(
        map((response) => {
          // needed to transform the result, from a normal pojo to a MoviesList
          const result: ListResult<Movie> = plainToClassFromExist(
            new ListResult<Movie>(Movie),
            response.data
          );
          return result;
        })
      );
  }

  private listMovies(uri: string, page = 1): Observable<ListResult<Movie>> {
    const params = { ...this.defaultParams, page };
    return this.httpService.get(`${this.baseUrl}/${uri}`, { params }).pipe(
      map((response) => {
        const result: ListResult<Movie> = plainToClassFromExist(
          new ListResult<Movie>(Movie),
          response.data
        );
        return result;
      })
    );
  }

  listpopular(page = 1): Observable<ListResult<Movie>> {
    return this.listMovies("movie/popular", page);
  }

  listTopRated(page = 1): Observable<ListResult<Movie>> {
    return this.listMovies("movie/top_rated", page);
  }

  listUpcoming(page = 1): Observable<ListResult<Movie>> {
    return this.listMovies("movie/upcoming", page);
  }
}
