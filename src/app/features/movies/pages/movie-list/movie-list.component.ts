import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Importaciones locales
import { Movie } from '../../../../core/models/movie.model';
import { MovieApiResponse } from '../../../../core/models/api-response.model';
import { MovieService } from '../../../../core/services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['poster', 'title', 'release_date', 'vote_average', 'overview'];
  
  dataSource = new MatTableDataSource<Movie>([]);
  
  totalResults = 0;
  pageSize = 20; 
  currentPage = 1;

  isLoading = false;
  searchQuery = '';
  
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef // 👈 Inyección para forzar actualización de UI
  ) {}

  ngOnInit(): void {
    this.loadMovies(this.currentPage);

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(query => {
      this.currentPage = 1;
      this.loadMovies(this.currentPage, query);
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  loadMovies(page: number, query?: string): void {
    this.isLoading = true;
    this.cdr.detectChanges(); // Asegura que el spinner aparezca al iniciar la petición

    this.movieService.getMovies(page, query).subscribe({
      next: (response: MovieApiResponse) => {
        this.dataSource.data = response.results;
        this.totalResults = response.total_results;
        this.isLoading = false;
        this.cdr.detectChanges(); // 👈 Fuerza el apagado del spinner y renderizado de la tabla
      },
      error: (err: Error) => {
        this.dataSource.data = [];
        this.isLoading = false;
        this.showErrorSnackBar(err.message || 'Error al conectar con el servidor');
        this.cdr.detectChanges();
      }
    });
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery = value;
    this.searchSubject.next(value);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.loadMovies(this.currentPage, this.searchQuery);
  }

  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}