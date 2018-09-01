import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Actor } from '../../../shared/models/i-actor';
import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent implements OnInit {
  @Input() person: Actor;
  @Input() imgPath: string;
  constructor() { }

  ngOnInit() {
  }
  cutDescription = (text) => text.length < 190 ? text : text.substr(0, 190)+'...'

  formatRating = (value) => Math.round(value);

}
