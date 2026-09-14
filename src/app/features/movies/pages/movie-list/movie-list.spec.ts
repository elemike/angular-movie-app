import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../../../core/services/movie.service';
import { of, throwError } from 'rxjs';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';
import { vi, describe, beforeEach, it, expect } from 'vitest';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieServiceMock: { getMovies: ReturnType<typeof vi.fn> };

  const mockResponse = {
    page: 1,
    results: [
      {
        id: 1,
        title: 'Matrix',
        overview: 'Sci-fi movie',
        poster_path: '/path.jpg',
        release_date: '1999-03-31',
        vote_average: 8.7
      }
    ],
    total_pages: 10,
    total_results: 200
  };

  beforeEach(async () => {
    movieServiceMock = {
      getMovies: vi.fn().mockReturnValue(of(mockResponse))
    };

    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceMock },
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar las películas populares al inicializar (ngOnInit)', () => {
    expect(movieServiceMock.getMovies).toHaveBeenCalledWith(1, undefined);
    expect(component.dataSource.length).toBe(1);
    expect(component.totalResults).toBe(200);
  });

  it('debe realizar la búsqueda aplicando el debounceTime de 400ms', async () => {
    const inputEvent = { target: { value: 'Matrix' } } as unknown as Event;

    component.onSearchChange(inputEvent);
    expect(movieServiceMock.getMovies).toHaveBeenCalledTimes(1); // Llamada de ngOnInit

    // Simula el tiempo de espera del debounce
    await new Promise((resolve) => setTimeout(resolve, 450));

    expect(movieServiceMock.getMovies).toHaveBeenCalledTimes(2);
    expect(movieServiceMock.getMovies).toHaveBeenCalledWith(1, 'Matrix');
  });

  it('debe cambiar de página correctamente', () => {
    const pageEvent: PageEvent = {
      pageIndex: 2,
      previousPageIndex: 1,
      pageSize: 20,
      length: 200
    };

    component.onPageChange(pageEvent);

    // La página enviada al servicio debe ser pageIndex + 1 (3)
    expect(component.currentPage).toBe(3);
    expect(movieServiceMock.getMovies).toHaveBeenCalledWith(3, '');
  });

  it('debe manejar errores de la API y limpiar el estado de la tabla', () => {
    movieServiceMock.getMovies.mockReturnValue(throwError(() => new Error('Error al conectar con la API')));

    component.loadMovies(1);

    expect(component.dataSource).toEqual([]);
    expect(component.isLoading).toBe(false);
  });
});