import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() ev = new EventEmitter();
  @Input() activeView;
  searchQuery:string;
  searchLabelText:string = 'Поиск фильма'
  constructor() { }

  
  ngOnChanges(changes): void { //changes: SimpleChanges подчеркивает
    this.searchLabelText = changes.activeView.currentValue == 'persons' ? 'Поиск актера' : 'Поиск фильма'
  }

  ngOnInit() {
  }


  searchHandler(value){
    this.ev.emit(value);
  }


}
