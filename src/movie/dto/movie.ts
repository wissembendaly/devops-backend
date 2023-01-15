import { Exclude } from "class-transformer";

export class Movie {
  poster_path: string | null;
  @Exclude()
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  @Exclude()
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  @Exclude()
  vote_count: number;
  @Exclude()
  video: boolean;
  vote_average: number;
}
