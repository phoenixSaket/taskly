import { Component, Input, OnInit } from '@angular/core';
import { categories, types } from '../models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
  @Input() title: string = "Add new weekly pin"
  @Input() category: categories = categories.new;
  @Input() date: string = "";
  @Input() time: string = "";
  @Input() type: types = types.null;
  @Input() description: string = "";

  constructor() {}
  
  ngOnInit(): void {
    
  }
  
}
