import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from '../../../shared/models/i-film';
import { RouterModule, Routes } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';
@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Output() update = new EventEmitter<string>();
  @Output() updateBookmark = new EventEmitter<string>();
  @Input() film: Film;
  @Input() imgPath: string;
  constructor(private service : CommonService) { }
  ngOnInit() {
  }

  ratingColor = (average) => this.service.ratingColor(average);
  

  cutDescription = (text) => text.length < 190 ? text : text.substr(0, 190)+'...'

  favoriteHandler(){
    this.update.emit();
  }

  bookmarkHandler(){
    this.updateBookmark.emit();
  }




}
