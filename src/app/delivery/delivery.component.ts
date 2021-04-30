import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { User } from '../interfaces/User';
import { Car } from '../interfaces/Car';
import { Cart } from '../interfaces/Cart';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  public deliveryForm: FormGroup;

  constructor(private fb: FormBuilder, private crudService: CrudService) {}

  public cars: Car[] = [];

  ngOnInit(): void {
    this.initForm();
    this.crudService
      .getData<Cart>('carts')
      .subscribe((value: Cart[]) => (this.cars = value[0].cart));
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
    return result;
  }

  private initForm(): void {
    this.deliveryForm = this.fb.group({
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
      country: [
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
