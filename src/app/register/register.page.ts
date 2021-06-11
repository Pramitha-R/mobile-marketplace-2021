import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ActionSheetController, NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild(IonSlides, {static :false}) slides:IonSlides;
  email;

  currentUser;
  slideOpts={
    slidesPerView:1,
    allowTouchMove:false
  }
  hideResend:boolean;
  registration_form:FormGroup;
  hasVerifiedEmail=true;
  stopInterval=false;
  sentTimestamp;
  interval;

  constructor(
    private router:Router,
    private location:Location,
    private navCtrl:NavController,
    public authService:AuthenticationService,
    private formBuilder:FormBuilder,
  ) {
    this.hideResend=false;

    this.authService.getUser().subscribe(result => {
      this.currentUser = result;
      if(result){
        this.email=result.email;
        if(result && result.email && !result.emailVerified){
          console.log('email not verified');
          this.slides.slideTo(1, 500);
        }
      }
    });
  }
   
  sendEmailVerification(){
    this.authService.getUser().subscribe((user) => {
      user.sendEmailVerification().then((result) => {

      })
    })
  }

  ngOnInit() {
    this.registration_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      confPassword: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    }, { validator: this.passwordMatchValidator });

    this.interval = setInterval(() => {
      this.authService.getUser().subscribe(result => {
        this.currentUser = result;
      if(this.currentUser) {
        this.email = this.currentUser.email;
        this.currentUser.reload();
        console.log('email', this.currentUser.emailVerified)
        this.hasVerifiedEmail = this.currentUser.emailVerified;
        if(this.hasVerifiedEmail) {
          //this.authService.setEmailVerified(this.hasVerifiedEmail, this.currentUser.uid, this.CurrentUser);
          this.stopInterval= true;
          clearInterval(this.interval);
          this.navCtrl.navigateRoot(['']);
        }
      }
     // });
    });


  }, 5000);
  if(this.stopInterval) {
    clearInterval(this.interval);
  }

  }

  signUp(value) {
    this.authService.RegisterUser(value.email, value.password).then((res) => {
      this.sendEmailVerification();
      this.goNext();
    }).catch((error) => {
      window.alert(error.message)
    })
  }

  goNext() {
    this.slides.slideNext(500).then(d=>console.log(d))
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confPassword'].value ? null : { 'mismatch' : true };
  }

  back(){
    this.router.navigateByUrl('/login');
  }
  

  

}
