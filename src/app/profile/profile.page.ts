import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import { UserService } from './../services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { DataAccessService } from 'src/app/services/data-access..service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  default = true;
  imageUrl = "https://image.shutterstock.com/image-vector/social-member-vector-icon-person-260nw-1139787308.jpg";
  photoUrl;
  user;
  edit_form: FormGroup;
  imageFile;
  data;

  constructor(
    private router:Router,
    private authSvc:AuthenticationService,
    private userService: UserService,
    private formBuilder:FormBuilder,
    private util:UtilService,
    private dataSvc:DataAccessService,
  ) { 
    this.edit_form = this.formBuilder.group({
      
      username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      contactno: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this.authSvc.getUser().subscribe(user => {
      this.user = user; 
    });

    this.authSvc.getUser().subscribe(user => {
      this.user = user; 
      this.dataSvc.getdpListings(this.user.uid).subscribe(result=>{
        console.log(result)
        this.data = result;
      })
    });
  }
  
  ngOnInit() { }
  
  editprofile() {
    this.default = false;
  }

  Signout() {
    this.authSvc.SignOut().then((res) => {
      this.router.navigateByUrl('/login');
    });
  }

  updateProfileImg() {
    let imgUrlP = this.userService.uploadingdpImage(this.imageFile);
    console.log(imgUrlP);
    imgUrlP.then(snapShot => {
      console.log('The image is uploading');
      snapShot.ref.getDownloadURL()
      .then(url => {
        this.imageUrl = url;
        console.log('An image is uploaded with url: ${this.imageUrl}');
      })
    });
  }

  uploadImage($event) {
    this.imageFile = $event.target.files[0];
  }

  updateprofile(){
    console.log(this.imageUrl)
    let userdetail ={
      username:this.edit_form.value.username,
      email:this.edit_form.value.email,
      contactno:this.edit_form.value.contactno, 
      photoUrl: this.imageUrl 
    }
    console.log(this.user.uid, userdetail);
    this.dataSvc.addprofileListing(this.user.uid, userdetail).then(()=>{
      this.util.toast('details has been successfully added!', 'success', 'bottom');
      this.default = true;
      //this.router.navigate(['./tabs/profile']);
      
    }).catch(err => {
      this.util.errorToast('Error in profile listing. Please try again!');
    })
  }

  back(){
    this.default = true;;
  }

}