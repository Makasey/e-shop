import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CrudService} from "../services/crud.service";
import {Car} from "../interfaces/Car";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  addCarForm: FormGroup;
  public isHidden: boolean = true;

  constructor(private fb: FormBuilder, private crudService: CrudService) { }
  public viewAddCarBlock(){
    this.isHidden = true
  }

  ngOnInit() {
    this.initForm();
  }
  onSubmit() {
    const controls = this.addCarForm.controls;
    console.log(this.addCarForm.value);
    if (this.addCarForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    console.log({...this.addCarForm.controls})
    const data: Car = {...this.addCarForm.value}
    console.log(data)
    this.crudService.createEntity("CarsArray", data);
    this.addCarForm.reset()

  }
  isControlInvalid(controlName: string): boolean {
    const control = this.addCarForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
  private initForm() {
    this.addCarForm = this.fb.group({
      name: ['', [Validators.required,]],
      surname: ['', [Validators.required,]],
      price: ['', [Validators.required]],
      engineCapacity: ['', [Validators.required]],
      enginePower: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      image: ['', [Validators.required]],

    });
  }

}
