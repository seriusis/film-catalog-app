import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class NotFoundComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  timeToRedirect:number = 10;

  ngOnInit() {
    this.setTimer();
  }

  setTimer(){
    let timer = setInterval(()=> --this.timeToRedirect , 1000);
    setTimeout(()=> {
      clearInterval(timer);
      this.router.navigate(['/main'])
    },10000)
  }

}
