import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, tap, pluck, map, mergeMap, catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {API_CONFIG} from '../../shared/configs/config';
import {Config} from '../../shared/models/i-config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn = false;
  //user:object;

  constructor(
    private http: HttpClient,
    private router:Router,
    @Inject(API_CONFIG) public apiConfig: Config,
  ) {
      // при обновлении страницы смотрим в localStorage чтоб проверить есть ли токен
      this.loggedIn = !!localStorage.getItem('auth_token');
  }

  isLoggedIn() {
    return this.loggedIn;
  }


  login(username: string, password: string):Observable<any>{
    return this.http.get(`${this.apiConfig.authUrl}/token/new?api_key=${this.apiConfig.apiKey}`)
    .pipe(
      pluck('request_token'), 
      mergeMap((token:string) => {
       return this.http.get(`${this.apiConfig.authUrl}/token/validate_with_login?api_key=${this.apiConfig.apiKey}&username=${username}&password=${password}&request_token=${token}`)
      }),
      pluck('request_token'), 
      mergeMap((token:string)=> {
        return this.http.get(`${this.apiConfig.authUrl}/session/new?api_key=${this.apiConfig.apiKey}&request_token=${token}`)
      }),
      pluck('session_id'), 
      tap((session:string) => { 
        localStorage.setItem('auth_token', session)
        this.loggedIn = true;
      }),

      mergeMap((token:string) => { 
        return this.http.get(`${this.apiConfig.apiUrl}/account?api_key=${this.apiConfig.apiKey}&session_id=${token}`)
      }),
      tap(user => {
        localStorage.setItem('user_id', user['id']);
        //this.user = user;
      }),

      catchError((err) => err.status === 404 ? throwError('not found'): throwError(err))
    );
    
  }

  deleteSession():Observable<any>{
    let headers = new HttpHeaders({
      //'Content-Type':  'application/json',
      "session_id" : localStorage.getItem('auth_token'),
      'api_key' : this.apiConfig.apiKey
    })
   
    let params  = new HttpParams().set('api_key', this.apiConfig.apiKey);
    return this.http.delete(`${this.apiConfig.authUrl}/session`, {headers:headers, params:params})
  }

  logout() {
    this.deleteSession().subscribe(
      req => {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this.router.navigate(['/login']);
      },
      error => console.log('logout request error'))
      
    // localStorage.removeItem('auth_token');
    // this.loggedIn = false;
    // this.router.navigate(['/login']);
  }
}
