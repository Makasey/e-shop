import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {AppComponent} from "./app.component";
import {headerComponent} from "./headerComponent/header.component";
import {AuthGuardService} from "./guards/auth-guard.service";
import {HomeComponent} from "./homePage/home.component";

const routes: Routes = [
  {path: 'app', component: AppComponent },
  {path:'catalog', component:CatalogComponent,canActivate:[AuthGuardService]},
  {path:'', component:HomeComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
