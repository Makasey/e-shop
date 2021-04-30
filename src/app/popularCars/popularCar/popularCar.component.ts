import { Component, Input } from '@angular/core';
import { Car } from '../../interfaces/Car';

@Component({
  selector: 'popular-car',
  templateUrl: './popularCar.component.html',
  styleUrls: ['./popularCar.component.scss'],
})
export class PopularCarComponent {
  @Input()
  public car: Car;
}
