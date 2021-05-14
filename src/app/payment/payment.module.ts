import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthGuardService } from '../guards/auth-guard.service';
import { PaymentComponent } from './payment.component';

const routes: Routes = [
  { path: 'orders', component: PaymentComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TextMaskModule,
    SimpleNotificationsModule.forRoot(),
  ],
})
export class PaymentModule {}
