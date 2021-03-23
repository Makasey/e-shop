import {Component, OnInit} from '@angular/core';
import {Car} from "../interfaces/Car";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'popular-cars',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularCarsComponent implements OnInit{

  public title = 'Popular Cars';

  public cars: Car[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
      this.firestore.collection<Car>('CarsArray')
        .valueChanges()
        .subscribe( (value: Car[]) => this.cars = value)

  }

}
