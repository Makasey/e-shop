import {Component, OnInit} from '@angular/core';
import {Car} from "../interfaces/Car";
import {AngularFirestore} from "@angular/fire/firestore";
import {CrudService} from "../services/crud.service";

@Component({
  selector: 'popular-cars',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularCarsComponent implements OnInit{

  public title = 'Popular Cars';

  public cars: Car[] = [];

  constructor(private firestore: AngularFirestore, private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.getData<Car>("CarsArray")
      .subscribe((value: Car[]) => this.cars = value)
      // this.firestore.collection<Car>('CarsArray')
      //   .valueChanges()
      //   .subscribe( (value: Car[]) => this.cars = value)


  }

}
