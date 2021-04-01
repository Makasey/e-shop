import {Component, Input} from '@angular/core';
import {Car} from "../../interfaces/Car";

@Component({
  selector: 'app-catalogItem',
  templateUrl: './catalogItem.component.html',
  styleUrls: ['./catalogItem.component.scss']
})
export class CatalogItemComponent {
  title = 'Catalog';
  @Input()
  public car?: Car;
}
