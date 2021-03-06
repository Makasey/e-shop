import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { canActivate } from '@angular/fire/auth-guard';
import { InfoAccComponent } from './info-acc.component';
import { AuthGuardService } from '../guards/auth-guard.service';

const routes: Routes = [
  { path: 'infoAcc', component: InfoAccComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [InfoAccComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class InfoAccModule {}
