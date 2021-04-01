import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-menu-header',
  templateUrl: './headerMenu.component.html',
  styleUrls: ['./headerMenu.component.scss']
})
export class headerMenuComponent {
  public menuPoint = 'Home';
  public menuCatalog = 'Catalog';
  public menuAccount = 'Account';

  constructor(private auth: AuthService) {

  }
  public signIn():void{
    this.auth.googleSign().subscribe()
  }

}
