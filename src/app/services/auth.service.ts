import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {from, Observable} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public test: Observable<any>;

  constructor(private angAuthService: AngularFireAuth) {
    this.test = angAuthService.authState;

  }

  public googleSign(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.angAuthService.signInWithPopup(provider)).pipe(
      tap((userCred: auth.UserCredential) => {
        this.updateUserData(userCred.user);
      }),
      take(1),
    );
  }

  public signOut(): Observable<void> {
    return from(this.angAuthService.signOut()).pipe(take(1));
  }

  public updateUserData(user: any): void {
      console.log(user)
  }
}

