import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthGuardService } from '../guards/auth-guard.service';
import { OrderListComponent } from './order-list.component';

const routes: Routes = [
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [OrderListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OrderListModule {}
