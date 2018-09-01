import { Injectable, Inject } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import {API_CONFIG} from '../../shared/configs/config';
import {Config} from '../../shared/models/i-config';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { FilmDetailed } from '../../shared/models/i-film-detailed';
import { isNgTemplate } from '@angular/compiler';
import { CommonService } from '../services/common.service';


@Injectable({
  providedIn: 'root'
})
export class FilmService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) public apiConfig: Config,
    private activeRouter:  ActivatedRoute,
    private service: CommonService
  ) {}

  /*films in homepage*/
  getPopularFilms (page:number = 1) {
    return this.http.get(`${this.apiConfig.movieUrl}/popular?page=${page}${this.apiConfig.params}`)
  }


  searchMovie(page:number = 1, query){
    return this.http.get(`${this.apiConfig.searchUrl}/movie?page=${page}${this.apiConfig.params}&query=${query}`)
  }

  getNowPlaying(page:number = 1){
    return this.http.get(`${this.apiConfig.nowPlaying}?page=${page}${this.apiConfig.params}`)
  }



  /*list of films*/
  getFilms(page, query:string = ''){
    return query ? this.searchMovie(page, query) : this.getPopularFilms(page);
  }

  /*single film*/
  getDetails(id:number){
    return this.http.get(`${this.apiConfig.movieUrl}/${id}?${this.apiConfig.params}`);
  }

  getFilmImages(id:number){
    return this.http.get(`${this.apiConfig.movieUrl}/${id}/images?api_key=${this.apiConfig.apiKey}`);
  }

  getFilmActors(id:number){
    return this.http.get(`${this.apiConfig.movieUrl}/${id}/credits?api_key=${this.apiConfig.apiKey}`);
  }

  prepareData(array){
    var filmData = array.map((item, index) => {
      switch (index){
        case 0 : return this.prepareFilmDetails(item);
        case 1 : return item.backdrops
        case 2 : return item.cast;
      };  

    }); 

   return {
     details : filmData[0],
     gallery : this.prepareFilmGallery(filmData[1]),
     cast: this.prepareFilmCast( filmData[2])
   };
  }

  prepareFilmDetails(item){
    return {
      id : item.id,
      budget : item.budget.toLocaleString('ru'),
      genres : item.genres,
      originalTitle : item.original_title,
      overview : item.overview,
      popularity : Math.round(item.popularity),
      poster: item.poster_path,
      date :  this.service.formatDateFull(item.release_date),
      runtime : item.runtime,
      languages : item.spoken_languages,
      status : item.status,
      tagline : item.tagline,
      title : item.title, 
      rating : item.vote_average 
    }
  }

  prepareFilmGallery = array =>  array.map((item)=> ({image : item.file_path}));
  
  prepareFilmCast = array => {
     return array.map(actor=> {
      return {
        id : actor.id,
        name : actor.name,
        photo : actor.profile_path,
        character: actor.character
      };
    });
  }
}

