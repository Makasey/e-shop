import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [{ path: 'delivery', component: DeliveryComponent }];

@NgModule({
  declarations: [DeliveryComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class DeliveryModule {}
