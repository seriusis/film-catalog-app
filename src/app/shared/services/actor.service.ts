import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_CONFIG} from '../../shared/configs/config';
import {Config} from '../../shared/models/i-config';
import { CommonService } from '../services/common.service';
import { Observable } from 'rxjs';
import { ActorDetailed } from '../../shared/models/i-actor-detailed';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) public apiConfig: Config,
    private service: CommonService
  ) {}


  getPopularPerson(page:number = 1):Observable<any>{
    return this.http.get(`${this.apiConfig.personUrl}/popular?page=${page}${this.apiConfig.params}`)
  } 

  searchPerson(page:number = 1, query):Observable<any>{
    return this.http.get(`${this.apiConfig.searchUrl}/person?page=${page}${this.apiConfig.params}&query=${query}`)
  }

  
  getPersons(page, query:string = ''):Observable<any>{
   return query ? this.searchPerson(page, query) : this.getPopularPerson(page);
  }
  

  getDetails(id:number):Observable<any>{
    return this.http.get(`${this.apiConfig.personUrl}/${id}?${this.apiConfig.params}`);
  }

  getActorCasts(id:number):Observable<any>{
    return this.http.get(`${this.apiConfig.personUrl}/${id}/movie_credits?api_key=${this.apiConfig.apiKey}`);
  }

  prepareData(array):ActorDetailed{
    let actorData = array.map((item, index) => {
      switch (index){
        case 0 : return this.prepareActorDetails(item);
        case 1 : return this.prepareActorCharacters(item.cast.sort(this.sortCharacters).slice(0, 20));
      };  

    }); 

   return {
     details : actorData[0],
     characters : actorData[1]
   };
  }

  sortCharacters(a,b) {
    if (a.popularity > b.popularity)
      return -1;
    if (a.popularity < b.popularity)
      return 1;
    return 0;
  }

  prepareActorDetails(actor){
    return {
      id: actor.id,
      name: actor.name,
      birthday : this.service.formatDateFull(actor.birthday),
      biography : actor.biography,
      gender : actor.gender == 1 ? 'Женщина' : 'Мужчина',
      birthplace : actor.place_of_birth,
      popularity : Math.round(actor.popularity),
      photo : actor.profile_path,
      nicks : actor.also_known_as
    }
  }

  prepareActorCharacters(characters:Array<any>){
    return characters.map((character)=>{
      return {
        title : character.title,
        date : this.service.formatDateYear(character.release_date),
        character: character.character,
        poster : character.poster_path,
        id: character.id
      }
    })
  }





}
