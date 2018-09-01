import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Router} from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router:Router,
    private loginService: LoginService,
  ) {}

  // canActivate(){
  //   if( localStorage.getItem('isAuth') == '1'){
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
 
  // }


  canActivate() {

    const isLogin = this.loginService.isLoggedIn();
    if (isLogin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }




}

