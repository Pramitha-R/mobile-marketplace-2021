import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  constructor(private router:Router, private authService:AuthenticationService) { }

  ngOnInit() {
  }

  onLogin(form:NgForm){
    if(form.valid){
      this.authService.SignIn(this.email, this.password).then((results)=>{
        console.log(results);
        if(results.user && results.user.emailVerified){
          console.log(results.user);
          this.router.navigate(['']);
        }
        else{
          this.router.navigateByUrl('/register');
          return false;
        }
      }).catch((error)=>{
        if(error.code == 'auth/user-not-found'){
          this.errorMessage = 'There is no user record corresponding to this email. Please try again';
        }
        else{
          this.errorMessage = error.message;
        }
      })
    }
  }

  register(){
    this.router.navigate(['register']);
  }
}
