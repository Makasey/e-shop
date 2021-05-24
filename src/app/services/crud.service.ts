import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {from, Observable, Subject} from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import firebase from 'firebase';
import { Car } from '../interfaces/Car';
import DocumentReference = firebase.firestore.DocumentReference;
import firestore = firebase.firestore;
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private firestoreService: AngularFirestore) {}

  public beforeLogout: Subject<void> = new Subject<void>();

  public createEntity(collectionName: string, data: object): Observable<string> {
    return from(this.firestoreService.collection(collectionName).add(data)).pipe(
      map((value: DocumentReference) => value.id),
      take(1),
    );
  }

  public updateObject(collectionName: string, id: string, data: {}) {
    return from(
      this.firestoreService.collection(collectionName).doc(id).set(data, { merge: false }),
    ).pipe(take(1));
  }

  public getObjectByRef(collectionName: string, id: string): Observable<any> {
    return from(this.firestoreService.collection(collectionName).doc(id).get()).pipe(
      map((value) => value.data()),
      take(1),
    );
  }

  public getOneObj<T>(collectionName: string, id: string): Observable<any> {
    return this.firestoreService.collection(collectionName).doc(id).valueChanges();
  }

  public getData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const uid = reference.payload.doc.id;
            return { uid, ...data } as T;
          }),
        ),
      );
  }

  public getDataWithQuery<T>(
    collectionName: string,
    { firstQueryValue, firstQueryName, secondQueryValue = '.', secondQueryName = '.' },
  ): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query
          .where(`${firstQueryName}`, '==', `${firstQueryValue}`)
          .where(`${secondQueryName}`, '==', `${secondQueryValue}`);
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const { id } = reference.payload.doc;
            return { id, ...data } as T;
          }),
        ),
      );
  }

  public getFilterProducts<T>(
    collectionName: string,
    queryTitle: string,
    queryDirection: OrderByDirection,
    limit = 10,
    startAt = 1,
  ): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.orderBy(`${queryTitle}`, queryDirection).limit(limit);
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const { id } = a.payload.doc;
            return { id, ...data } as T;
          }),
        ),
        take(1),
      );
  }

  public getOneDataWithQuery<T>(
    collectionName: string,
    { firstQueryValue, firstQueryName },
  ): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.where(`${firstQueryName}`, '==', `${firstQueryValue}`);
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const { id } = reference.payload.doc;
            return { id, ...data } as T;
          }),
        ),
        take(1),
      );
  }

  public updateCart<T>(collectionName: string, id: string, cart: Car[]) {
    return from(
      this.firestoreService.collection(collectionName).doc(id).set({ cart }, { merge: true }),
    ).pipe(
      map(() => id),
      take(1),
    );
  }

  public updateCartObject(collectionName: string, id: string, value: string): Observable<void> {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .set({ status: value }, { merge: true }),
    ).pipe(take(1));
  }
  public updateUserBalance(collectionName: string, id: string, value): Observable<void> {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .set({ balance: value }, { merge: true }),
    ).pipe(take(1));
  }

  public updateWish<T>(collectionName: string, id: string, wishlist: Car[]) {
    return from(
      this.firestoreService.collection(collectionName).doc(id).set({ wishlist }, { merge: true }),
    ).pipe(
      map(() => id),
      take(1),
    );
  }

  public updateComparison<T>(collectionName: string, id: string, items: Car[]) {
    return from(
      this.firestoreService.collection(collectionName).doc(id).set({ items }, { merge: true }),
    ).pipe(
      map(() => id),
      take(1),
    );
  }

  public handleData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const uid = reference.payload.doc.id;
            return { uid, ...data } as T;
          }),
        ),
      );
  }

  public delete(collectionName: string, id: string): Observable<void> {
    return from(this.firestoreService.collection(collectionName).doc(id).delete()).pipe(take(1));
  }

  public getInfoWithQuery<T>(
    collectionName: string,
    { firstQueryValue, firstQueryName },
  ): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.where(`${firstQueryName}`, '==', `${firstQueryValue}`);
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const { id } = reference.payload.doc;
            return { id, ...data } as T;
          }),
        ),
      );
  }
}
