import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { from, Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from '../storage.service';
import { CrudService } from './crud.service';
import auth = firebase.auth;
import storage = firebase.storage;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<any>;

  constructor(
    private angAuthService: AngularFireAuth,
    private storageService: StorageService,
    private firestoreService: AngularFirestore,
    private crudService: CrudService,
  ) {
    this.user$ = angAuthService.authState;
    this.user$
      .pipe(
        tap((user: firebase.User) => (this.storageService.userData = user)),
        switchMap((user: firebase.User) => {
          if (user) {
            return this.firestoreService.doc<firebase.User>(`users/${user.uid}`).valueChanges();
          }
          return of(null);
        }),
      )
      .subscribe();
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
    return from(this.angAuthService.signOut()).pipe(
      tap(() => {
        this.storageService.userData = null;
      }),
      take(1),
    );
  }

  public updateUserData(user: any): void {
    const data = {
      userId: user.uid,
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
      balance: 0,
    };
    this.crudService.createEntity('usersData', data);
  }
}
