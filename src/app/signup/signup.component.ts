import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthService, private router: Router){}

  submit(){
    this.auth.signup(this.signupForm.get('email')?.value, this.signupForm.get('password')?.value).then(user => {
      console.log(user);
      this.router.navigate(["home"]);
    }).catch(error => {
      console.log(error);
    });
  }
}
