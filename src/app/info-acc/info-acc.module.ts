import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { InfoAccComponent } from './info-acc.component';

const routes: Routes = [{ path: '', component: InfoAccComponent }];

@NgModule({
  declarations: [InfoAccComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class InfoAccModule {}
