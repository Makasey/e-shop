import { Component, Input, OnInit } from '@angular/core';
import {filter, switchMap, take, tap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import { of } from 'rxjs';
import firebase from 'firebase';
import { CrudService } from '../services/crud.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { Car } from '../interfaces/Car';
import User = firebase.User;
import {Cart} from '../interfaces/Cart';

@UntilDestroy()
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private authService: AuthService,
    private storageService: StorageService,
  ) {}

  public carsArray: Car[] = [];

  public totalCartPrice = 0;

  public deleteFromWish(index) {
    const filteredArray = this.storageService.wishListData.wishlist.filter((it, idx) => idx !== index);
    this.carsArray = filteredArray;
    this.storageService.wishListData.wishlist = filteredArray;
    this.crudService
      .updateWish('wishlists', this.storageService.wishListData.id, filteredArray)
      .subscribe();
  }
  // public addToCart() {
  //   if (this.storageService.userData) {
  //     this.crudService
  //       .getDataWithQuery('carts', {
  //         firstQueryName: 'userId',
  //         firstQueryValue: this.storageService.userData.uid,
  //         secondQueryName: 'status',
  //         secondQueryValue: 'active',
  //       })
  //       .pipe(
  //         untilDestroyed(this),
  //         take(1),
  //         switchMap((value: Cart[]) => {
  //           const shopCart: Cart = value[0];
  //           if (!shopCart) {
  //             return this.crudService.createEntity('carts', {
  //               cart: [this.car],
  //               userId: this.storageService.userData.uid,
  //               status: 'active',
  //             });
  //           }
  //           shopCart.cart.push(this.car);
  //           return this.crudService.updateCart('carts', shopCart.id, shopCart.cart);
  //         }),
  //       )
  //       .subscribe();
  //   }
  // }

  public ngOnInit(): void {
    this.storageService.userData$
      .pipe(
        filter((value: User) => !!value),
        switchMap((value) => {
          if (value.uid) {
            return this.crudService
              .getDataWithQuery('wishlists', {
                firstQueryName: 'userId',
                firstQueryValue: value.uid,
                secondQueryName: 'status',
                secondQueryValue: 'active',
              })
              .pipe(
                untilDestroyed(this),
                tap((value1: any) => {
                  this.carsArray = value1[0].wishlist;
                  console.log(this.carsArray);
                  this.storageService.wishListData = value1[0];
                  this.totalCartPrice = this.carsArray.reduce(( acc, it) => ( acc += +it.price), 0);
                }),
              );
          }
          return of([]);
        }),
      )
      .subscribe();
  }
}
