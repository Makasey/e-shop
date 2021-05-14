import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase';
import { Cart } from './interfaces/Cart';
import {Wish} from './interfaces/Wish';
import {Order} from './interfaces/Order';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public userData$: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  private _userData: firebase.User;

  public cartData$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(null);

  private _cartData: Cart;

  public wishListData$: BehaviorSubject<Wish> = new BehaviorSubject<Wish>(null);

  private _wishListData: Wish;

  public orderData$: BehaviorSubject<Order> = new BehaviorSubject<Order>(null);

  private _orderData: Order;

  public get userData(): firebase.User {
    return this._userData;
  }

  public get cartData(): Cart {
    return this._cartData;
  }

  public get wishListData(): Wish {
    return this._wishListData;
  }

  public get orderData(): Order {
    return this._orderData;
  }

  public set userData( _userData: firebase.User) {
    if (this._userData !== _userData) {
      this._userData = _userData;
      this.userData$.next(this._userData);
    }
  }

  public set cartData( _cartData: Cart) {
    if (this._cartData !== _cartData) {
      this._cartData = _cartData;
      this.cartData$.next(this._cartData);
    }
  }

  public set wishListData( _wishListData: Wish) {
    if (this._wishListData !== _wishListData) {
      this._wishListData = _wishListData;
      this.wishListData$.next(this._wishListData);
    }
  }

  public set orderData( _orderData: Order) {
    if (this._orderData !== _orderData) {
      this._orderData = _orderData;
      this.orderData$.next(this._orderData);
    }
  }
}
