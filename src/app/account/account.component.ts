import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Car } from '../interfaces/Car';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  addCarForm: FormGroup;

  public isHidden = true;
  public isPromocode = false;

  constructor(private fb: FormBuilder, private crudService: CrudService,private router: Router,) {}

  // tslint:disable-next-line:typedef
  public viewAddCarBlock() {
    this.isHidden = true;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public onSubmit() {
    const { controls } = this.addCarForm;
    if (this.addCarForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    const data: Car = { ...this.addCarForm.value };
    this.crudService.createEntity('CarsArray', data);
    this.addCarForm.reset();
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.addCarForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  private initForm(): void {
    this.addCarForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      price: ['', [Validators.required]],
      engineCapacity: ['', [Validators.required]],
      enginePower: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      image: ['', [Validators.required]],
      sale: ['', [Validators]],
    });
  }
}
