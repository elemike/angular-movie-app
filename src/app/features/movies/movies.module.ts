import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieListComponent } from './pages/movie-list/movie-list.component';

@NgModule({
  imports: [
    CommonModule,
    MovieListComponent // Al ser Standalone, debe ir en imports
  ],
  exports: [
    MovieListComponent
  ]
})
export class MoviesModule { }