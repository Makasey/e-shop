import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Gallery } from 'angular-gallery';
import { CrudService } from '../services/crud.service';
import { Car } from '../interfaces/Car';
import { Cart } from '../interfaces/Cart';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private storageService: StorageService,
    private gallery: Gallery,
  ) {
    this.activatedRoute.params.subscribe((value) => {
      this.uid = value.uid;
    });
  }

  public uid: string;

  public car: Car;

  ngOnInit(): void {
    this.crudService
      .getOneObj('CarsArray', this.uid)
      .subscribe((value: Car) => (this.car = { ...value, uid: this.uid }));
    console.log(this.car.releaseDate);
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

  public showGallery(index: number): void {
    const prop = {
      images: [
        {
          path:
            'https://firebasestorage.googleapis.com/v0/b/alex-3af36.appspot.com/o/banner_first.jpg?alt=media&token=b361beae-2ad4-4e23-8e39-f9e31bcd7a84',
        },
        {
          path:
            'https://firebasestorage.googleapis.com/v0/b/alex-3af36.appspot.com/o/banner_first.jpg?alt=media&token=b361beae-2ad4-4e23-8e39-f9e31bcd7a84',
        },
        {
          path:
            'https://firebasestorage.googleapis.com/v0/b/alex-3af36.appspot.com/o/banner_first.jpg?alt=media&token=b361beae-2ad4-4e23-8e39-f9e31bcd7a84',
        },
      ],
      index,
    };
    this.gallery.load(prop);
  }
}
