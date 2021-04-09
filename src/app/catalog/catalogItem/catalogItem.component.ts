import {Component, Input} from '@angular/core';
import {Car} from "../../interfaces/Car";
import {CrudService} from "../../services/crud.service";

@Component({
  selector: 'app-catalogItem',
  templateUrl: './catalogItem.component.html',
  styleUrls: ['./catalogItem.component.scss']
})
export class CatalogItemComponent {

  @Input()
  public car?: Car;

  public title: string = 'Catalog';

  constructor(private crudService: CrudService) {
  }

  public deleteCar() {
    this.crudService.delete("CarsArray", this.car.uid).subscribe(() => console.log(this.car.uid))
  }

  public addToCart() {
    console.log(this.car)
    this.crudService.createEntity("cartArray", {})
  }

}
