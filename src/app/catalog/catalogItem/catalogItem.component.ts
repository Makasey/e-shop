import { Component, Input } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Car } from '../../interfaces/Car';
import { CrudService } from '../../services/crud.service';
import { StorageService } from '../../storage.service';
import { Cart } from '../../interfaces/Cart';

@Component({
  selector: 'app-catalogItem',
  templateUrl: './catalogItem.component.html',
  styleUrls: ['./catalogItem.component.scss'],
})
export class CatalogItemComponent {
  @Input()
  public car?: Car;

  public title = 'Catalog';

  constructor(
    private crudService: CrudService,
    private storageService: StorageService,
    private router: Router,
  ) {}

  // public  toDetails(){
  //   console.log(this.car.id)
  //   this.router.navigate([`/details/${this.car.uid}`])
  // }

  public deleteCar() {
    this.crudService.delete('CarsArray', this.car.uid).subscribe(() => console.log(this.car.uid));
  }

  public addToCart() {
    console.log(this.car.id);
    if (this.storageService.userData) {
      this.crudService
        .getDataWithQuery('carts', {
          firstQueryName: 'userId',
          firstQueryValue: this.storageService.userData.uid,
          secondQueryName: 'status',
          secondQueryValue: 'active',
        })
        .pipe(
          take(1),
          switchMap((value: Cart[]) => {
            const shopCart: Cart = value[0];
            if (!shopCart) {
              return this.crudService.createEntity('carts', {
                cart: [this.car],
                userId: this.storageService.userData.uid,
                status: 'active',
              });
            }
            shopCart.cart.push(this.car);
            return this.crudService.updateCart('carts', shopCart.id, shopCart.cart);
          }),
        )
        .subscribe();
    }
  }
}
