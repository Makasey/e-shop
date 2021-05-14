import { Component, OnInit } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import firebase from 'firebase';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CrudService } from '../services/crud.service';
import { Car } from '../interfaces/Car';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import User = firebase.User;

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class headerComponent implements OnInit {
  public title = 'header';

  public cartCounter = 0;

  public isCart = false;

  public carsArray: Car[] = [];

  public car: Car;

  public isAccount = true;

  public totalCartPrice = 0;

  public isEmpty = true;

  constructor(
    private crudService: CrudService,
    private auth: AuthService,
    private storageService: StorageService,
  ) {}

  public isViewCart(event) {
    event.stopPropagation();
    if (this.isCart) {
      return (this.isCart = false);
    }
    return (this.isCart = true);
  }

  public closeCart() {
    return (this.isCart = false);
  }

  public stopProp($event): void {
    $event.stopPropagation();
  }

  public deleteFromCart(index) {
    const filteredArray = this.storageService.cartData.cart.filter((it, idx) => idx !== index);
    this.carsArray = filteredArray;
    this.storageService.cartData.cart = filteredArray;
    this.crudService
      .updateCart('carts', this.storageService.cartData.id, filteredArray)
      .subscribe();
  }

  public signIn(): void {
    this.auth.googleSign().subscribe();
    this.isAccount = false;
  }

  public signOut(): void {
    this.isAccount = true;
    this.auth.signOut().subscribe();
  }

  public isCartEmpty(): boolean {
    return !this.carsArray.length;
  }

  public ngOnInit(): void {
    this.storageService.userData$
      .pipe(
        filter((value: User) => !!value),
        switchMap((value) => {
          if (value.uid) {
            return this.crudService
              .getDataWithQuery('carts', {
                firstQueryName: 'userId',
                firstQueryValue: value.uid,
                secondQueryName: 'status',
                secondQueryValue: 'active',
              })
              .pipe(
                untilDestroyed(this),
                tap((value: any) => {
                  this.carsArray = value[0].cart;
                  this.storageService.cartData = value[0];
                  this.totalCartPrice = this.carsArray.reduce((acc, it) => (acc += +it.price), 0);
                }),
              );
          }
          return of([]);
        }),
      )
      .subscribe();
  }
}
