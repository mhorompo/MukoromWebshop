import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  login(email :string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email,password);
  }

  logout(){
    return this.fireAuth.signOut();
  }

  isUserLoggedIn(){
    return this.fireAuth.user;
  }

  isLoggedIn() : Promise<boolean>{
    return new Promise((resolve: any) => {
      this.fireAuth.onAuthStateChanged((user: any) => {
        user ? resolve(true) : resolve(false);
      });
    });
  }
}
