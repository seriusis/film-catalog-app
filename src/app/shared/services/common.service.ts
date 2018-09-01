import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  formatDateFull = (string:string) => new Date(string).toLocaleDateString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric' })
  formatDateYear = (string:string) => new Date(string).toLocaleDateString('ru-RU', {year: 'numeric'})

  
  ratingColor(average){
    if(average >= 7){
      return  'green';
    } else if((average < 8) && (average > 6)){
      return 'orange';
    } else {
      return 'grey';
    }
  } 

}


