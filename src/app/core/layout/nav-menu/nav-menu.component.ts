import { Component } from '@angular/core';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isMenuVisible: boolean = false;

  toggleMenu(): void{
    this.isMenuVisible = !this.isMenuVisible;
  }
}
