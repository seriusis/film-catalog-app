import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {FilmService} from '../../shared/services/film.service';
import {ActorService} from '../../shared/services/actor.service';
import { SearchResults } from '../../shared/models/i-search-results';
import { Router } from '@angular/router'

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();
  @Output() clearEvent = new EventEmitter();
  isValid:boolean = true;
  isActive:boolean = false;
  @Input() labelText:string;
  searchQuery:string = ''; 
  constructor(
    private filmService: FilmService,
    private actorService: ActorService,
    private router: Router
  ) { }

  ngOnInit() {}

  clearResults(){
    this.isActive = false;
    this.searchQuery = '';
    this.clearEvent.emit();
  }

  searchHandler(value:string, page?){
    this.isActive = true;
    this.isValid = value.length >= 3;
    if(this.isValid){
      this.searchEvent.emit(this.searchQuery);
    }
  }
}
