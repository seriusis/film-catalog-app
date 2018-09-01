import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class FavoriteApiService {

    constructor(private http: HttpClient) {}
    
    localApiUrl = 'http://localhost:3000/';
    favoriteApiUrl = this.localApiUrl+'films/favorites';

    getFavorite(ids:Array<number>){
        return this.http.get(`${this.favoriteApiUrl}?filmIds=${ids.join(',')}`);
    }
    addToFavorite(id:number){
        return this.http.post(this.favoriteApiUrl, {id : id});
    }
    removeFromFavorite(id:number){
        return this.http.delete(`${this.localApiUrl}films/${id}/favorites`)
    }
  }




