import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CrudService } from '../services/crud.service';
import { User } from '../interfaces/User';
import { Car } from '../interfaces/Car';
import { Cart } from '../interfaces/Cart';
import { StorageService } from '../storage.service';

@UntilDestroy()
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  public deliveryForm: FormGroup;
  // deliveryForm = new FormGroup({
  //   cityName: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(20),
  //     Validators.pattern('/[A-Za-z]/'),
  //   ]),
  //   streetName: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(20),
  //     Validators.pattern('/[А-я]/'),
  //   ]),
  //   country: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(20),
  //     Validators.pattern('/[А-я]/'),
  //   ]),
  //   houseAddress: new FormControl('', [
  //     Validators.required,
  //     Validators.min(1),
  //     Validators.max(999),
  //   ]),
  //   name: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.pattern('/[А-я]/'),
  //   ]),
  //   surname: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(2),
  //     Validators.pattern('/[А-я]/'),
  //   ]),
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.email,
  //     Validators.pattern('/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/'),
  //   ]),
  //   phone: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('/+[0-9]{3} {0,1}[0-9]{2} {0,1}[0-9]{3} {0,1}[0-9]{2} {0,1}[0-9]{2}/'),
  //   ]),
  // });

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private storageService: StorageService,
  ) {}

  public cars: Car[] = [];

  public carsCounter: number;

  ngOnInit(): void {
    this.initForm();
    setInterval(() => {
      console.log(this.deliveryForm.controls);
    }, 10000);

    this.storageService.userData$
      .pipe(
        untilDestroyed(this),
        switchMap((value) => {
          if (value) {
            return this.crudService
              .getDataWithQuery<Cart>('carts', {
                firstQueryName: 'userId',
                firstQueryValue: value.uid,
                secondQueryName: 'status',
                secondQueryValue: 'active',
              })
              .pipe(
                untilDestroyed(this),
                tap((value1) => {
                  this.cars = value1[0].cart;
                  this.storageService.cartData = value1[0];
                  this.carsCounter = this.cars.reduce((acc, it) => (acc += +it.price), 0);
                }),
              );
          }
          return of([]);
        }),
      )
      .subscribe();
  }

  public onSubmit(): void {
    const { controls } = this.deliveryForm;
    if (this.deliveryForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    const data: User = { ...this.deliveryForm.value };
    this.crudService.createEntity('users', data);
    this.deliveryForm.reset();
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.deliveryForm.controls[controlName];
    const result = control.invalid && control.touched;
    console.log(control);
    return result;
  }

  private initForm(): void {
    this.deliveryForm = this.fb.group({
      country: [
        '',
        [
          Validators.required,
          Validators.pattern(`[A-Za-z]`),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      cityName: [
        '',
        [
          Validators.required,
          Validators.pattern(`[A-Za-z]`),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      streetName: [
        '',
        [
          Validators.required,
          Validators.pattern(`[A-Za-z]`),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      houseAddress: [
        '',
        [
          Validators.required,
          Validators.pattern(`[A-Za-z]`),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(`[A-Za-z]`),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.pattern(`[A-Za-z]`),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(`[A-Za-z]`),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(`[A-Za-z]`),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }
}
