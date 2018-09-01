import { Component, OnInit,  ViewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { FilmService } from '../../shared/services/film.service';
import { Film } from '../../shared/models/i-film';
import { FilmsResults } from '../../shared/models/i-films-results';
import { ActorService } from '../../shared/services/actor.service';
import { PersonsResults } from '../../shared/models/i-persons-results';


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  pageName: string = "Film Catalog Dashboard";

  list: string[] = ['asd', 'asd']; 
  imgPath = this.filmService.apiConfig.midImgPath;
  nowPlaying: Array<any> = [];
  popularFilms: Array<any> = [];
  popularActors: Array<any> = [];

  constructor(
    private filmService: FilmService,
    private actorService: ActorService
  ) { }

  ngOnInit() {
    this.getNowPlayingFilms();
    this.getPopularFilms();
    this.getActors();


  
  }

  getNowPlayingFilms(){
    this.filmService.getNowPlaying().subscribe(
      (films:FilmsResults) => {
        this.nowPlaying = films.results.slice(0, 4);
      }
    )
  }

  getPopularFilms(){
    this.filmService.getPopularFilms().subscribe(
      (films:FilmsResults) => {
        this.popularFilms = films.results.slice(0, 4);
      }
    )
  }

  getActors(){
    this.actorService.getPopularPerson().subscribe(
      (actors: PersonsResults) => {
        this.popularActors = actors.results.slice(0, 4);
      }
    )
  }



}
