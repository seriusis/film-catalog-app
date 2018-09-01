import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authUrl = 'https://reqres.in/api';
  private loggedIn = false;

  // user = {
  //   login: 'test',
  //   pass: 'test'
  // }

  constructor(
    private http: HttpClient,
    private router:Router
  ) {
      // при обновлении страницы смотрим в localStorage чтоб проверить есть ли токен
      this.loggedIn = !!localStorage.getItem('auth_token');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, {username, password})
      .pipe(
        retry(2),
        tap(res => {
          if (res.token) {
            localStorage.setItem('auth_token', res.token);
            this.loggedIn = true;
          }
        }),
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
