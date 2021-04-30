import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from '../delivery/delivery.component';
import { AccountComponent } from './account.component';
import { InfoAccComponent } from '../info-acc/info-acc.component';

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
];

const routes: Routes = [{ path: '', component: AccountComponent, children: accountRoutes }];

@NgModule({
  declarations: [AccountComponent],
  imports: [RouterModule.forChild(routes), CommonModule, BrowserModule],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
