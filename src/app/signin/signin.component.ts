import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthService, private router: Router){}


  submit(){
    this.auth.login(this.signinForm.get('email')?.value, this.signinForm.get('password')?.value).then(user => {
      if(user){
        this.router.navigate(["home"]);
      }
    }).catch(error => {
      console.log(error);
    });
  }
}
