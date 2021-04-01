import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {headerComponent} from "./headerComponent/header.component";
import {headerMenuComponent} from "./headerComponent/headerMenu.component/headerMenu.component";
import {MarketBannerComponent} from "./marketBanner/marketBanner.component";
import {PopularCarsComponent} from "./popularCars/popular.component";
import {PopularCarComponent} from "./popularCars/popularCar/popularCar.component";
import {FooterComponent} from "./footerComponent/footer.component";

import {AngularFireModule} from "@angular/fire";
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {CatalogComponent} from "./catalog/catalog.component";
import {HomeComponent} from "./homePage/home.component";
import {CatalogItemComponent} from "./catalog/catalogItem/catalogItem.component";
import { CarouselSlideComponent} from "./marketBanner/carousel-slide/carousel-slide.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    headerMenuComponent,
    MarketBannerComponent,
    PopularCarsComponent,
    PopularCarComponent,
    FooterComponent,
    CatalogComponent,
    HomeComponent,
    CatalogItemComponent,
    CarouselSlideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
