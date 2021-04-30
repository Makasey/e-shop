import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Car } from '../interfaces/Car';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  title = 'Catalog';

  public cars: Car[] = [];

  constructor(private firestore: AngularFirestore, private crudService: CrudService) {}

  public createCar(): void {
    this.crudService.createEntity('CarsArray', { name: 'BMW', surname: 'X5' });
  }

  public ngOnInit(): void {
    // this.firestore.collection<Car>('CarsArray')
    //   .valueChanges()
    //   .subscribe((value: Car[]) => {this.cars = value;
    //     console.log(this.cars)})
    this.crudService.getData<Car>('CarsArray').subscribe((value: Car[]) => (this.cars = value));
  }
}
