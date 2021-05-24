import { Component, Input } from '@angular/core';
import { untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, take } from 'rxjs/operators';
import { Car } from '../../interfaces/Car';
import { Wish } from '../../interfaces/Wish';
import { StorageService } from '../../storage.service';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-popular-car',
  templateUrl: './popularCar.component.html',
  styleUrls: ['./popularCar.component.scss'],
})
export class PopularCarComponent {
  constructor(private storageService: StorageService, private crudService: CrudService) {}

  @Input()
  public car: Car;

  public addToWishList() {
    if (this.storageService.userData) {
      this.crudService
        .getDataWithQuery('wishlists', {
          firstQueryName: 'userId',
          firstQueryValue: this.storageService.userData.uid,
          secondQueryName: 'status',
          secondQueryValue: 'active',
        })
        .pipe(
          take(1),
          switchMap((value: Wish[]) => {
            console.log(value);
            const shopCart: Wish = value[0];
            if (!shopCart) {
              return this.crudService.createEntity('wishlists', {
                wishlist: [this.car],
                userId: this.storageService.userData.uid,
                status: 'active',
              });
            }
            shopCart.wishlist.push(this.car);
            return this.crudService.updateWish('wishlists', shopCart.id, shopCart.wishlist);
          }),
        )
        .subscribe();
    }
  }
}
