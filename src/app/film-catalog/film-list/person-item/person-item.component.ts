import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent implements OnInit {
  @Input() person: object;
  @Input() imgPath: string;
  constructor() { }

  ngOnInit() {
  }
  cutDescription = (text) => text.length < 190 ? text : text.substr(0, 190)+'...'
}
