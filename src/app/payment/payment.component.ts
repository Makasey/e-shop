import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { luhnValidator } from './validators/luhnValidator';
import { getValidationConfigFromCardNo } from './helpers/card.helper';

import { StorageService } from '../storage.service';
import { User } from '../interfaces/User';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  cardNumberGroup: FormGroup;

  constructor(
    private crudService: CrudService,
    private storageService: StorageService,
    private router: Router,
    private notification: NotificationsService,
  ) {}

  public ngOnInit(): void {
    this.cardNumberGroup = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(14),
      ]),
      cvv: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
    });
  }

  public submitForm(): void {
    const { controls } = this.cardNumberGroup;
    console.log(this.cardNumberGroup);

    console.log('Test');
    const data = {
      balance: controls.value.value,
    };
    console.log(this.storageService.userData.uid);
    this.crudService
      .getOneDataWithQuery('usersData', {
        firstQueryName: 'userId',
        firstQueryValue: this.storageService.userData.uid,
      })
      .pipe(
        switchMap((value1: any) => {
          console.log(value1);
          if (value1) {
            const [userInfo] = value1;
            let finalBalance = +userInfo.balance || 0;
            finalBalance += +data.balance;
            this.notification.success('Успех', 'Счёт пополнен', {
              timeOut: 1800,
              showProgressBar: true,
              clickToClose: true,
            });
            setTimeout(() => {
              this.router.navigate(['/account']);
            }, 2000);
            return this.crudService.updateUserBalance('usersData', value1[0].id, finalBalance);
          }
          this.notification.error('Ошибка', 'Что-то пошло не так', {
            timeOut: 2500,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
          });
          return [];
        }),
        take(1),
      )
      .subscribe();
    this.cardNumberGroup.reset();
  }

  public getCardNumberControl(): AbstractControl | FormControl | null {
    return this.cardNumberGroup && this.cardNumberGroup.get('cardNumber');
  }

  public cardMaskFunction(rawValue: string): Array<RegExp> {
    const card = getValidationConfigFromCardNo(rawValue);
    if (card) {
      return card.mask;
    }
    return [/\d/];
  }
}

// if (this.cardNumberGroup.invalid) {
//   Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
//   console.log('test1');
//   return;
// }
