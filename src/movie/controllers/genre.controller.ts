import { Controller, Get, Put } from "@nestjs/common";
import { Genre } from "src/Models/tmdb/db/genre.model";
import { GenreService } from "../services/genre.service";

@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}
  @Get("movies")
  async listGenres(): Promise<Genre[]> {
    return this.genreService.findAll(
      {},
      { createdAt: 0, updatedAt: 0, deletedAt: 0, isDeleted: 0 }
    );
  }

  @Put("refresh/movies")
  async refreshList() {
    return this.genreService.refreshMoviesGenres();
  }
}
