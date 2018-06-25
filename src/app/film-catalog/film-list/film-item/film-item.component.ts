import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Output() update = new EventEmitter<string>();
  @Input() film: object;
  @Input() imgPath: string;
  ratingColor;
  constructor() { }
  ngOnInit() {
    this.setRatingColor();
  }

  setRatingColor(){
    let average = this.film['vote_average'];
    if(average >= 7){
      this.ratingColor = 'green';
    } else if((average < 8) && (average > 6)){
      this.ratingColor = 'orange';
    } else {
      this.ratingColor = 'grey';
    }
  }

  cutDescription = (text) => text.length < 190 ? text : text.substr(0, 190)+'...'

 /* favoriteHandler(index){
    this.update.emit();
  }*/

}
