import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FormsModule } from '@angular/forms';
import { FilmItemComponent } from './film-list/film-item/film-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import { PersonItemComponent } from './actor-list/person-item/person-item.component';
import { SearchComponent } from './search/search.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { LoginComponent } from './login/login.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { AppRoutingModule } from '../app-routing.module';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { NotFoundComponent } from './not-found/not-found.component';


 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    AppRoutingModule,
    Ng2CarouselamosModule


  ],
  declarations: [
    MainComponent, 
    FilmListComponent, 
    FilmItemComponent, PersonItemComponent, SearchComponent, ActorListComponent, LoginComponent, FilmDetailsComponent, ActorDetailsComponent, NotFoundComponent  ]
})
export class FilmCatalogModule { }
