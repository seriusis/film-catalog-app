import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { CommonService } from '../../shared/services/common.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}


  loginForm = this.fb.group({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
     // Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
      Validators.pattern(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA*]{5,}/)
    ])
  })

  errorsMsg = {
    'name' : {
      'required' : 'Логин не может быть пустым',
      'minlength' : 'Логин должен быть от 5 символов',
      'maxlength' : 'Логин должен быть до 25 символов',
      //'email' : 'Неверный формат логина'
    },
    'password' : {
      'required' : '',
      'minlength' : 'Пароль должен быть от 5 символов',
      'maxlength' : 'Пароль должен быть до 25 символов',
      'pattern' : "Неверный формат пароля"

    }
  }

  validErrors = {
    'name' : [],
    'password' : []
  }


  ngOnInit() {
    let isLogin = localStorage.getItem('isAuth') == '1';
    isLogin && this.goToMain();
    this.initForm();
  }

  initForm(){
    this.loginForm.valueChanges.subscribe(data => this.validateForm())
  }

  validateForm(){
    if(!this.loginForm) return;
    
    for(let item in this.validErrors){
      this.validErrors[item] = [];
      let control = this.loginForm.get(item);
      if (control && control.dirty && !control.valid) {
        let msg = this.errorsMsg[item];
        for(let key in control.errors){
          this.validErrors[item].push(msg[key])
        }
      }
    }
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.get('name').value, this.loginForm.get('password').value).subscribe(
        () => this.goToMain(),
        err =>  {
          console.log(err);
          (err.status === 401) && this.snackBar.open('Неверный логин или пароль!', '', {duration:3500, horizontalPosition:'left'});
        }
      );
    }
  }

  goToMain(){
      this.router.navigate(['/main']);
  }
 
}
