import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  }) 

  export class BookmarkApiService {

    constructor(private http: HttpClient) {}
    
    localApiUrl = 'http://localhost:3000/';
    bookmarkApiUrl = this.localApiUrl+'films/bookmarks';

    getBookmark(ids:Array<number>){
        return this.http.get(`${this.bookmarkApiUrl}?filmIds=${ids.join(',')}`);
    }
    addToBookmark(id:number){
        return this.http.post(this.bookmarkApiUrl, {id : id});
    }
    removeFromBookmark(id:number){
        return this.http.delete(`${this.localApiUrl}films/${id}/bookmarks`)
    }
  }




