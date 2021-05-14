import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IvyGalleryModule } from 'angular-gallery';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { headerComponent } from './headerComponent/header.component';
import { headerMenuComponent } from './headerComponent/headerMenu.component/headerMenu.component';
import { MarketBannerComponent } from './marketBanner/marketBanner.component';
import { PopularCarsComponent } from './popularCars/popular.component';
import { PopularCarComponent } from './popularCars/popularCar/popularCar.component';
import { FooterComponent } from './footerComponent/footer.component';

import { environment } from '../environments/environment';
import { CatalogComponent } from './catalog/catalog.component';
import { HomeComponent } from './homePage/home.component';
import { CatalogItemComponent } from './catalog/catalogItem/catalogItem.component';
import { CarouselSlideComponent } from './marketBanner/carousel-slide/carousel-slide.component';
import { imagePipe } from './pipes/imagePipe';
import { ZoomDirective } from './zoom.directive';
import { doubleContentDirective } from './double-content.directive';
import { CarDetailsComponent } from './car-details/car-details.component';
import { AccountRoutingModule } from './account/account.module';
import { WishListComponent } from './wish-list/wish-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PaymentComponent } from './payment/payment.component';
import { ComparisonListComponent } from './comparison-list/comparison-list.component';

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
    CarouselSlideComponent,
    imagePipe,
    ZoomDirective,
    doubleContentDirective,
    CarDetailsComponent,
    ComparisonListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountRoutingModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    IvyGalleryModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
