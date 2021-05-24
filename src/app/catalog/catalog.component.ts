import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Car } from '../interfaces/Car';
import { CrudService } from '../services/crud.service';
import { PaginationService } from '../pagination.service';

@UntilDestroy()
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  title = 'Catalog';

  public cars: Car[] = [];

  public carsArray: Car[] = [];

  public itemsOnPage = 3;

  public startPag = 0;

  public endPag = 3;

  public isPag = false;

  constructor(
    private firestore: AngularFirestore,
    private crudService: CrudService,
    private paginateService: PaginationService,
  ) {}

  public swapPage(arg: number): void{
    this.startPag += arg * 3;
    this.endPag += arg * 3;
    this.carsArray = this.paginateService.doPaginate(this.cars, this.startPag, this.endPag);
    console.log(this.startPag, this.endPag);
  }

  public filter(value): void {
    const queryValue: string = value.target.value;
    switch (queryValue) {
      case 'Toyota':
        console.log('Toyota');
        this.crudService
          .getOneDataWithQuery<Car>('CarsArray', {
            firstQueryName: 'name',
            firstQueryValue: 'Toyota',
          })
          .subscribe((value1) => {
            this.carsArray = value1;
            console.log(this.carsArray);
          });
        break;
      case 'Ford':
        console.log('Ford');
        this.crudService
          .getOneDataWithQuery<Car>('CarsArray', {
            firstQueryName: 'name',
            firstQueryValue: queryValue,
          })
          .pipe(
            tap((value1) => {
              this.carsArray = value1;
            }),
            untilDestroyed(this),
          )
          .subscribe();
        break;
      case 'Volkswagen':
        console.log('Volk');
        this.crudService
          .getOneDataWithQuery<Car>('CarsArray', {
            firstQueryName: 'name',
            firstQueryValue: queryValue,
          })
          .pipe(
            tap((value1) => {
              this.carsArray = value1;
            }),
            untilDestroyed(this),
          )
          .subscribe();
        break;
      case 'Ferrari':
        console.log('Ferrari');
        this.crudService
          .getOneDataWithQuery<Car>('CarsArray', {
            firstQueryName: 'name',
            firstQueryValue: queryValue,
          })
          .pipe(
            tap((value1) => {
              this.carsArray = value1;
            }),
            untilDestroyed(this),
          )
          .subscribe();
        break;
      case 'Reno':
        console.log('Reno');
        this.crudService
          .getOneDataWithQuery<Car>('CarsArray', {
            firstQueryName: 'name',
            firstQueryValue: queryValue,
          })
          .pipe(
            tap((value1) => {
              this.carsArray = value1;
            }),
            untilDestroyed(this),
          )
          .subscribe();
        break;
      default:
        console.log('default');
        this.crudService.getData<Car>('CarsArray').subscribe((value: Car[]) => {
          this.carsArray = value;
        });
        break;
    }
  }

  public sort(value): void {
    const queryValue: string = value.target.value;
    switch (queryValue) {
      case 'nameDesc':
        console.log('nameDesc');
        this.crudService.getFilterProducts<Car>('CarsArray', 'title', 'desc', 100, 1).subscribe();
        break;
      case 'nameAsc':
        console.log('nameAsc');
        this.crudService.getFilterProducts<Car>('CarsArray', 'title', 'asc', 100, 1).subscribe();
        break;
      case 'priceDesc':
        console.log('priceDesc');
        this.crudService.getFilterProducts<Car>('CarsArray', 'price', 'desc', 100, 1).subscribe();
        break;
      case 'priceAsc':
        console.log('priceAsc');
        this.crudService.getFilterProducts<Car>('CarsArray', 'title', 'asc', 100, 1).subscribe();
        break;
      case 'sale':
        console.log('sale');
        this.crudService.getFilterProducts<Car>('CarsArray', 'sale', 'asc', 100, 1).subscribe();
        break;
      default:
        console.log('default');
        break;
    }
  }

  public ngOnInit(): void {
    this.crudService.getData<Car>('CarsArray').subscribe((value: Car[]) => {
      this.cars = value;
      this.carsArray = this.paginateService.doPaginate(this.cars, this.startPag, this.endPag);
    });
  }
}
