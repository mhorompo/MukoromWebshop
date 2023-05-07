import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Output() onCloseSidenav = new EventEmitter();
  @Output() onLogout = new EventEmitter();
  @Input() loggedUser?: firebase.default.User | null;

  closeSidenav(){
    this.onCloseSidenav.emit();
  }

  logout(){
    this.onLogout.emit();
  }
}
