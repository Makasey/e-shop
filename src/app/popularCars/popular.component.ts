import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Car } from '../interfaces/Car';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'popular-cars',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularCarsComponent implements OnInit {
  public title = 'Popular Cars';

  public cars: Car[] = [];

  constructor(private firestore: AngularFirestore, private crudService: CrudService) {}

  public ngOnInit(): void {
    this.crudService.getData<Car>('CarsArray').subscribe((value: Car[]) => (this.cars = value));
    // this.firestore.collection<Car>('CarsArray')
    //   .valueChanges()
    //   .subscribe( (value: Car[]) => this.cars = value)
  }
}
