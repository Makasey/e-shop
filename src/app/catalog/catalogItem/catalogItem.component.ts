import { Component, Input } from '@angular/core';
import { switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NotificationsService } from 'angular2-notifications';
import { Car } from '../../interfaces/Car';
import { CrudService } from '../../services/crud.service';
import { StorageService } from '../../storage.service';
import { Cart } from '../../interfaces/Cart';
import { Wish } from '../../interfaces/Wish';

@UntilDestroy()
@Component({
  selector: 'app-catalog-item',
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
    private notification: NotificationsService,
  ) {}

  // public  toDetails(){
  //   console.log(this.car.id)
  //   this.router.navigate([`/details/${this.car.uid}`])
  // }

  // public deleteCar() {
  //   this.crudService.delete('CarsArray', this.car.uid).subscribe(() => console.log(this.car.uid));
  // }

  public addToCart(): void {
    if (this.storageService.userData) {
      this.crudService
        .getDataWithQuery('carts', {
          firstQueryName: 'userId',
          firstQueryValue: this.storageService.userData.uid,
          secondQueryName: 'status',
          secondQueryValue: 'active',
        })
        .pipe(
          untilDestroyed(this),
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

  public addToComparisonList(): void {
    if (this.storageService.userData) {
      this.crudService
        .getOneDataWithQuery('comparisons', {
          firstQueryName: 'uid',
          firstQueryValue: this.storageService.userData.uid,
        })
        .pipe(
          switchMap((value1: any) => {
            const comparison = value1[0];
            if (!comparison) {
              return this.crudService.createEntity('comparisons', {
                items: [this.car],
                uid: this.storageService.userData.uid,
              });
            }
            console.log(comparison.items);
            const index = value1[0].items.findIndex((item) => item.uid === this.car.uid);
            if (index === -1) {
              if (value1[0].items.length >= 4) {
                this.notification.error(
                  'Ошибка',
                  'Нельзя добавить больше 4 товаров в список сравнения',
                  {
                    timeOut: 2500,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true,
                  },
                );
              } else {
                comparison.items.push(this.car);
                console.log(comparison.items);
                this.notification.success('Успех', 'Товар добавлен в сравнение', {
                  timeOut: 2500,
                  showProgressBar: true,
                  pauseOnHover: true,
                  clickToClose: true,
                });
              }
              return this.crudService.updateComparison(
                'comparisons',
                comparison.id,
                comparison.items,
              );
            }
            this.notification.error('Ошибка', 'Товар удалён из сравнения', {
              timeOut: 2500,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            const newWishlist = comparison.items.filter((item) => item.uid !== this.car.uid);
            return this.crudService.updateComparison('comparisons', comparison.id, newWishlist);
          }),
          take(1),
        )
        .subscribe();
    } else {
      this.notification.error('Ошибка', 'Сначала войдите в аккаунт', {
        timeOut: 2500,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
      this.router.navigate(['/login']);
    }
  }
}
