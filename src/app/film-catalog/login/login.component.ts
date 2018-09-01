import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData = {
    login:'',
    pass:'',
  }

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    let isLogin = localStorage.getItem('isAuth') == '1';
    isLogin && this.goToMain();
  }

  // login(){
    
  //   if((this.loginService.user.login == this.formData.login) && (this.loginService.user.pass == this.formData.pass)){
  //     console.log('user is correct');
  //     this.goToMain();
  //   } else {
  //     localStorage.setItem('isAuth', '0');
  //     console.log('user is wrong');
  //   }
  // }

  login(){
  
      this.loginService.login(this.formData.login, this.formData.pass)
        .subscribe(
          () => {
            this.goToMain();
          },
          err => {
            console.log('user data error')
          }
        );
    }


  goToMain(){
      //localStorage.setItem('isAuth', '1');
      this.router.navigate(['/main']);
  }

  
}
