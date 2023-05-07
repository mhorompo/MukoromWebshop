import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(
      map(user => {
        if(user){
          return true;
        }else{
          this.router.navigate(["/signin"]);
          return false;
        }
      })
    )
  }
  
}
