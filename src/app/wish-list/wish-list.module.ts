import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthGuardService } from '../guards/auth-guard.service';
import { WishListComponent } from './wish-list.component';

const routes: Routes = [
  { path: 'wishList', component: WishListComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [WishListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WishListModule {}
