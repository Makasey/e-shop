import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './homePage/home.component';
import { AccountComponent } from './account/account.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ComparisonListComponent } from './comparison-list/comparison-list.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
  { path: 'details/:uid', component: CarDetailsComponent },
  { path: 'comparison', component: ComparisonListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
