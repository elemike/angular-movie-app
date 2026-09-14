import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MoviesModule } from './features/movies/movies.module';

@NgModule({
  imports: [
    BrowserModule,
    MoviesModule,
    AppComponent // Al ser Standalone, debe ir en imports
  ],
  providers: [
    provideHttpClient(),
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }