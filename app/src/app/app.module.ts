import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Api service
import { DataService } from './data.service';

import { AppComponent } from './app.component';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Components
import { ArticlesComponent } from './articles/articles.component';
import { AuthorsComponent } from './authors/authors.component';
import { FeatureComponent } from './feature/feature.component';
import { SeriesComponent } from './series/series.component';
import { YearsComponent } from './years/years.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PageComponent } from './page/page.component';

// Custom Pipes
import { RlzeroPipe } from './custom-pipes/rlzero.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    AuthorsComponent,
    FeatureComponent,
    SeriesComponent,
    YearsComponent,
    SearchComponent,
    SearchResultsComponent,
    PageComponent,
    RlzeroPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
