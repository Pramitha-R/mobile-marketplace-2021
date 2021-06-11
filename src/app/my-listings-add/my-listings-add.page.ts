import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';
import { DataAccessService } from 'src/app/services/data-access..service';
import {Router} from '@angular/router';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-my-listings-add',
  templateUrl: './my-listings-add.page.html',
  styleUrls: ['./my-listings-add.page.scss'],
})
export class MyListingsAddPage implements OnInit {

  imageFile;
  listing_form: FormGroup;
  user; 
  imageUrl = "https://p.kindpng.com/picc/s/288-2881103_blank-inside-of-card-hd-png-download.png";
  
  constructor(
    private authSvc:AuthenticationService,
    private util:UtilService,
    private formBuilder:FormBuilder,
    private userService: UserService, 
    private dataSvc:DataAccessService,
    private router:Router
  ) { 

    this.listing_form = this.formBuilder.group({
      
      title: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this.authSvc.getUser().subscribe(user => {
     this.user = user; 
   
    });
  }

  ngOnInit() {
  }

  uploadingImage() {
    let imgUrlP = this.userService.uploadingImage(this.imageFile);
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

  get_file($event) {
    this.imageFile = $event.target.files[0];
  }

  onClickSave(){
    console.log(this.imageUrl)
    if(this.imageUrl){
      let listing ={
        title:this.listing_form.value.title,
        description:this.listing_form.value.description,
        price:this.listing_form.value.price, 
        photoUrl: this.imageUrl 
       }
      console.log(this.user.uid, listing)
      this.dataSvc.addListing(this.user.uid, listing).then(()=>{
        this.util.toast('Listing has been successfully added!', 'success', 'bottom');
        this.router.navigate(['./tabs/my-listings']);
      })
      .catch(err => {
        this.util.errorToast('Error in adding listing. Please try again!');
      })
    
    }
    else{
      this.util.errorToast('Please upload image before saving!');
    }
  } 

  back(){
    this.router.navigate(['./tabs/my-listings']);
  }

}
