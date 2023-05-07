import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NailSaloon';
  loggedInUser?: firebase.default.User | null;
  badgeNum: number = 0;
  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}
  logout() {
    this.auth
      .logout()
      .then((_) => {
        console.log('Sikeres kilépés!');
        this.router.navigate(['/signin']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(sidenav: MatSidenav) {
    sidenav.close();
  }

  ngOnInit() {
    this.auth.isUserLoggedIn().subscribe(
      (user) => {
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        this.cartService
          .getCartItemCount(user?.uid as string)
          .subscribe((num) => {
           this.badgeNum = num;
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
