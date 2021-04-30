import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase';
import { Cart } from './interfaces/Cart';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public userData$: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  private _userData: firebase.User;

  public cartData$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(null);

  private _cartData: Cart;

  public wishListData$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(null);

  private _wishListData: Cart;

  public get userData(): firebase.User {
    return this._userData;
  }

  public get cartData(): Cart {
    return this._cartData;
  }

  public get wishListData(): Cart {
    return this._wishListData;
  }

  public set userData(_userData: firebase.User) {
    if (this._userData !== _userData) {
      this._userData = _userData;
      this.userData$.next(this._userData);
    }
  }

  public set cartData(_cartData: Cart) {
    if (this._cartData !== _cartData) {
      this._cartData = _cartData;
      this.cartData$.next(this._cartData);
    }
  }

  public set wishList(_cartData: Cart) {
    if (this._cartData !== _cartData) {
      this._cartData = _cartData;
      this.cartData$.next(this._cartData);
    }
  }
}
