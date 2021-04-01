import {Component, OnInit} from '@angular/core';
import {Car} from "../interfaces/Car";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  title = 'Catalog';
  public cars: Car[] = [];

  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit() {
    this.firestore.collection<Car>('CarsArray')
      .valueChanges()
      .subscribe((value: Car[]) => this.cars = value)

  }

}

