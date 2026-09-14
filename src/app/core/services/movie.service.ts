import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = environment.tmdbBaseUrl || 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1, query?: string): Observable<MovieApiResponse> {
    const endpoint = query && query.trim() !== '' 
      ? `${this.baseUrl}/search/movie` 
      : `${this.baseUrl}/movie/popular`;

    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-ES')
      .set('page', page.toString());

    if (query && query.trim() !== '') {
      params = params.set('query', query);
    }

    return this.http.get<MovieApiResponse>(endpoint, { params });
  }
}