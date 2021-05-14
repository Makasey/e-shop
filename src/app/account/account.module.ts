import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DeliveryComponent } from '../delivery/delivery.component';
import { AccountComponent } from './account.component';
import { InfoAccComponent } from '../info-acc/info-acc.component';
import { WishListComponent } from '../wish-list/wish-list.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { PaymentComponent } from '../payment/payment.component';

const accountRoutes: Routes = [
  {
    path: 'delivery',
    component: DeliveryComponent,
    loadChildren: () => import('../delivery/delivery.module').then((m) => m.DeliveryModule),
  },
  {
    path: 'infoAcc',
    component: InfoAccComponent,
    loadChildren: () => import('../info-acc/info-acc.module').then((m) => m.InfoAccModule),
  },
  {
    path: 'wishList',
    component: WishListComponent,
    loadChildren: () => import('../wish-list/wish-list.module').then((m) => m.WishListModule),
  },
  {
    path: 'orders',
    component: OrderListComponent,
    loadChildren: () => import('../order-list/order-list.module').then((m) => m.OrderListModule),
  },
  {
    path: 'payment',
    component: PaymentComponent,
    loadChildren: () => import('../payment/payment.module').then((m) => m.PaymentModule),
  },
];

const routes: Routes = [{ path: '', component: AccountComponent, children: accountRoutes }];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BrowserModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
