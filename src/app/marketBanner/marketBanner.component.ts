import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from '../services/crud.service';
import { Image } from '../interfaces/image';

@Component({
  selector: 'market-banner',
  templateUrl: './marketBanner.component.html',
  styleUrls: ['./marketBanner.component.scss'],
})
export class MarketBannerComponent implements OnInit {
  public sliderImages: Image[] = [];

  public counter = 0;

  public nextSlide() {
    this.counter++;
    if (this.counter >= this.sliderImages.length) {
      this.counter = 0;
    }
  }

  public prevSlide() {
    this.counter--;
    if (this.counter < 0) {
      this.counter = this.sliderImages.length - 1;
    }
  }

  constructor(private firestore: AngularFirestore, private crudService: CrudService) {}

  ngOnInit() {
    this.crudService
      .getData('sliderImages')
      .subscribe((value: Image[]) => (this.sliderImages = value));
    console.log();
  }
}
