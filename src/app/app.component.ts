import { Component } from '@angular/core';
import { MovieListComponent } from './features/movies/pages/movie-list/movie-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent],
  template: `<app-movie-list></app-movie-list>`
})
export class AppComponent {}