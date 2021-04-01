import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../../interfaces/image";
import {trigger,state,style,animate,transition} from "@angular/animations";

@Component({
  selector: 'app-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrls: ['./carousel-slide.component.sass']
})
export class CarouselSlideComponent implements OnInit {

  constructor() {}
  @Input()
  counter: number;
  @Input()
  image: Image;


  ngOnInit(): void {
  }

}
