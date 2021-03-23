import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-header',
  templateUrl: './headerMenu.component.html',
  styleUrls: ['./headerMenu.component.scss']
})
export class headerMenuComponent {
  public menuPoint = 'Home';
  public menuCatalog = 'Catalog';
  public menuAccount = 'Account';

}
