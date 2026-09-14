export interface ApiResponse {}
import { Movie } from './movie.model';

export interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}