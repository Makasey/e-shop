import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CrudService } from './services/crud.service';
import { UploadService } from './upload.service';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private crudService: CrudService,
    private uploadService: UploadService,
    private storageService: StorageService,
  ) {}

  title = 'AlexCar';

  public imageLink: string;

  public progress: string;

  public goTo(): void {
    // this.crudService.createEntity("CarsArray",{'name':"test1",'surname':"test2",'name3':"test3"}).pipe(
    //   tap(value => console.log(value)),
    //   switchMap(value =>
    //   this.crudService.updateObject('CarsArray',value,{'name':"test1",'surname':"test2",'name3':"test3"}).pipe(map(()=> value)))
    // )
    //   .subscribe(value => console.log(value))
    // this.crudService.getData("CarsArray").subscribe(value => this.crudService.getObjecByRef("CarsArray")).subscribe()
  }

  ngOnInit() {
    // this.crudService.handleData('books').subscribe((data) => this.storageService);
  }

  public onFileSelected(event): void {
    const file = event.target.files[0];
    combineLatest(this.uploadService.uploadFile('test', file))
      .pipe(
        tap(([percent, link]) => {
          this.progress = percent.toString();
          this.imageLink = link;
        }),
        takeWhile(([percent, link]) => !link),
      )
      .subscribe();
  }
}
