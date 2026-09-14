import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';
import { MovieApiResponse } from '../models/api-response.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  const mockApiResponse: MovieApiResponse = {
    page: 1,
    results: [
      {
        id: 1,
        title: 'Inception',
        original_title: 'Inception',
        overview: 'A thief who steals corporate secrets through dream-sharing technology.',
        release_date: '2010-07-16',
        vote_average: 8.8,
        poster_path: '/poster1.jpg',
        backdrop_path: null,
        popularity: 150.5
      }
    ],
    total_pages: 10,
    total_results: 200
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no existan peticiones HTTP pendientes
    httpMock.verify();
  });

  it('debe crearse el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener películas populares mediante una petición GET', () => {
    service.getMovies(1).subscribe(response => {
      expect(response.results.length).toBe(1);
      expect(response.results[0].title).toBe('Inception');
    });

    const req = httpMock.expectOne(req => req.url.includes('/movie/popular'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');

    req.flush(mockApiResponse);
  });

  it('debe buscar películas por texto cuando se proporciona un termino de búsqueda', () => {
    const query = 'Matrix';

    service.getMovies(1, query).subscribe(response => {
      expect(response.results.length).toBe(1);
    });

    const req = httpMock.expectOne(req => req.url.includes('/search/movie'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('query')).toBe('Matrix');

    req.flush(mockApiResponse);
  });
});