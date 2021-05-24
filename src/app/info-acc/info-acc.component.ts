import { Component, OnInit } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CrudService } from '../services/crud.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/User';
import { StorageService } from '../storage.service';
import set = Reflect.set;

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

  public balanced: any;

  public ngOnInit(): void {
    this.storageService.userData$
      .pipe(
        untilDestroyed(this),
        switchMap((value: any) => {
          if (value) {
            return this.crudService
              .getOneDataWithQuery('usersData', {
                firstQueryName: 'userId',
                firstQueryValue: value.uid,
              })
              .pipe(
                tap((value1: any) => {
                  this.accEmail = value1[0].email;
                  this.balanced = value1[0].balance;
                  this.accLogo = value1[0].photo;
                  this.accName = value1[0].name;
                  console.log(value1[0]);
                }),
                untilDestroyed(this),
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
