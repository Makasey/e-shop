import { Component, OnInit } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CrudService } from '../services/crud.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/User';
import { StorageService } from '../storage.service';
import set = Reflect.set;
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-info-acc',
  templateUrl: './info-acc.component.html',
  styleUrls: ['./info-acc.component.scss'],
})
export class InfoAccComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private authService: AuthService,
    private storageService: StorageService,
  ) {}

  public accLogo: string;

  public accName: string;

  public accEmail: string;

  public balance = 200;

  public ngOnInit(): void {
    this.storageService.userData$
      .pipe(
        untilDestroyed(this),
        switchMap((value) => {
          // setInterval(() => console.log(value), 2000);
          if (value) {
            return this.crudService
              .getDataWithQuery('usersData', {
                firstQueryName: 'userId',
                firstQueryValue: value.uid,
              })
              .pipe(
                untilDestroyed(this),
                tap(() => {
                  this.accName = value.displayName;
                  this.accLogo = value.photoURL;
                  this.accEmail = value.email;
                }),
              );
          }
          return of([]);
        }),
      )
      .subscribe();

    // this.crudService
    //   .getDataWithQuery('usersData', {
    //     firstQueryName: 'userId',
    //     firstQueryValue: this.storageService.userData.uid,
    //   })
    //   .subscribe();
  }
}
