import {Component, OnInit} from '@angular/core';
import {CrudService} from "../services/crud.service";
import {Car} from "../interfaces/Car";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class headerComponent implements OnInit {
  public title = 'header';
  public cartCounter = 0;
  public isCart = false;
  public carsArray: Car[] = [];
  public car: Car;
  public isAccount = true

  constructor(private crudService: CrudService, private auth: AuthService) {
  }

  public isViewCart(event) {
    event.stopPropagation();
    if (this.isCart) return this.isCart = false
    return this.isCart = true

  }

  public closeCart() {
    return this.isCart = false
  }

  public deleteFromCart(id) {
    console.log(id)
    //this.carsArray.filter( it => it.id !== id);
  }
  public signIn():void{
    this.auth.googleSign().subscribe()
  }
  public signOut():void{
    this.auth.signOut().subscribe()
  }

  ngOnInit() {
    this.crudService.getData("cartArray").subscribe(value => this.carsArray = value)
  }

}

