import { Injectable, Inject } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import {Config} from '../../shared/models/i-config';
import {API_CONFIG} from '../configs/config';
import {pluck, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  }) 

  export class BookmarkApiService {

    constructor(private http: HttpClient,
                @Inject(API_CONFIG) public apiConfig: Config,    
                ) {}
    
    token = localStorage.getItem('auth_token');
    user = localStorage.getItem('user_id');

    getBookmarkList(){
        return this.http.get(`${this.apiConfig.apiUrl}/account/${this.user}/watchlist/movies?api_key=${this.apiConfig.apiKey}&session_id=${this.token}`)
        .pipe(
            pluck('results'),
            map((items:Array<object>) =>  items.map(item => item['id'])),
        );
    }

    addToBookmark(id:number){
        return this.http.post(`${this.apiConfig.apiUrl}/account/${this.user}/watchlist?api_key=${this.apiConfig.apiKey}&session_id=${this.token}`, {
            "media_type": "movie",
            "media_id": id,
            "watchlist": true
        });
    }
    removeFromBookmark(id:number){
        return this.http.post(`${this.apiConfig.apiUrl}/account/${this.user}/watchlist?api_key=${this.apiConfig.apiKey}&session_id=${this.token}`, {
            "media_type": "movie",
            "media_id": id,
            "watchlist": false
        });
    }
  }




