import { Injectable, Inject } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import {API_CONFIG} from '../../shared/configs/config';
import {Config} from '../../shared/models/i-config';
import { mergeMap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { FilmDetailed } from '../../shared/models/i-film-detailed';
import { isNgTemplate } from '@angular/compiler';
import { CommonService } from '../services/common.service';
import { FilmDetailedDetails } from '../models/i-film-detailed-details';
import { FilmDetailedCast } from '../models/i-film-detailed-cast';
import { FilmDetailedGallery } from '../models/i-film-detailed-gallery';


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
  getPopularFilms (page:number = 1):Observable<any>{
    return this.http.get(`${this.apiConfig.movieUrl}/popular?page=${page}${this.apiConfig.params}`)
  }


  searchMovie(page:number = 1, query):Observable<any>{
    return this.http.get(`${this.apiConfig.searchUrl}/movie?page=${page}${this.apiConfig.params}&query=${query}`)
  }

  getNowPlaying(page:number = 1):Observable<any>{
    return this.http.get(`${this.apiConfig.nowPlaying}?page=${page}${this.apiConfig.params}`)
  }



  /*list of films*/
  getFilms(page, query:string = ''):Observable<any>{
    return query ? this.searchMovie(page, query) : this.getPopularFilms(page);
  }

  /*single film*/
  getDetails(id:number):Observable<any>{
    return this.http.get(`${this.apiConfig.movieUrl}/${id}?${this.apiConfig.params}`);
  }

  getFilmImages(id:number):Observable<any>{
    return this.http.get(`${this.apiConfig.movieUrl}/${id}/images?api_key=${this.apiConfig.apiKey}`);
  }

  getFilmActors(id:number):Observable<any>{
    return this.http.get(`${this.apiConfig.movieUrl}/${id}/credits?api_key=${this.apiConfig.apiKey}`);
  }

  prepareData(array):FilmDetailed{  
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

  prepareFilmDetails(item):FilmDetailedDetails{
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

  prepareFilmGallery = (posters):Array<FilmDetailedGallery> =>  posters.map((item)=> ({image : item.file_path})); 

  prepareFilmCast = (actors):Array<FilmDetailedCast> => {
   return actors.map(actor=> {
      return {
        id : actor.id,
        name : actor.name,
        photo : actor.profile_path,
        character: actor.character
      };
    });
  }
}

