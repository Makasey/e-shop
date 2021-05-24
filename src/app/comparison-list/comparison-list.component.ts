import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Wish } from '../interfaces/Wish';
import { CrudService } from '../services/crud.service';
import { StorageService } from '../storage.service';
import { Car } from '../interfaces/Car';

@Component({
  selector: 'app-comparison-list',
  templateUrl: './comparison-list.component.html',
  styleUrls: ['./comparison-list.component.scss'],
})
export class ComparisonListComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private crudService: CrudService,
    private router: Router,
  ) {}

  public comparisonList: any = {
    wishlist: [],
  };

  public comparisonListOptions: Array<{
    value: string;
    name: string;
  }>;

  public comparisonId: string | number;

  public subArray: Array<string> = [
    'comment',
    'image',
    'id',
    'uid',
    'name',
    'surname',
    'sale',
    'price',
  ];

  // public removeItem(index): void {
  //   console.log(this.storageService);
  //   const filteredArray = this.storageService.comparisonData.wishlist.filter((it, idx) => idx !== index);
  //
  //   this.comparisonList = filteredArray;
  //   this.storageService.cartData.cart = filteredArray;
  //   this.crudService
  //     .updateComparison('comparisons', this.storageService.comparisonData.id, filteredArray)
  //     .subscribe();
  // }

  ngOnInit(): void {
    this.storageService.userData$
      .pipe(
        switchMap((value) => {
          if (value?.uid) {
            return this.crudService
              .getOneDataWithQuery('comparisons', {
                firstQueryName: 'uid',
                firstQueryValue: value.uid,
              })
              .pipe(
                tap((value1: any) => {
                  if (value1.length) {
                    const comparisonItems = [...value1[0].items];
                    const array = comparisonItems.map((item, index) => {
                      const itemOptions = [];
                      for (const key of Object.keys(item)) {
                        if (!this.subArray.includes(key)) {
                          itemOptions.push({
                            name: key,
                            value: item[key],
                          });
                        }
                      }
                      const sortedItems = this.sortOptions(itemOptions);
                      this.comparisonId = value1[0].uid;
                      this.comparisonListOptions = sortedItems;
                      console.log(itemOptions);
                      return {
                        name: item.name,
                        surname: item.surname,
                        uid: item.uid,
                        image: item.image,
                        comment: item.comment,
                        price: item.price,
                        sale: item.sale,
                        options: sortedItems,
                      };
                    });
                    this.comparisonList.wishlist = array;
                    console.log(array);
                  }
                }),
              );
          }
          return of([]);
        }),
      )
      .subscribe();
  }

  private sortOptions(
    options,
  ): Array<{
    value: string;
    name: string;
  }> {
    const items = [];

    options.map((item) => {
      if (item.name === 'color') {
        items[0] = item;
      }
      if (item.name === 'releaseDate') {
        items[1] = item;
      }
      if (item.name === 'engineCapacity') {
        items[2] = item;
      }
      if (item.name === 'enginePower') {
        items[3] = item;
      }
      if (item.name === 'seats') {
        items[4] = item;
      }
      if (item.name === 'transmission') {
        items[4] = item;
      }
      return item;
    });
    return items;
  }
}
