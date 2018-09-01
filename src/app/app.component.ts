import { Component } from '@angular/core';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private loginService: LoginService){}

  links: object[] = [
    { path: '/main', label: 'Главная', active: 'button-active', icon: 'home'}, 
    { path: '/films', label: 'Все фильмы', active: 'button-active', icon: 'list_alt'},
    { path: '/actors', label: 'Все актеры', active: 'button-active', icon: 'people_outline'}
  ];

  get isLoggedIn(){
    return this.loginService.isLoggedIn();
  }

  logout(){
    this.loginService.logout();
  }
  
}
