import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataAccessService } from 'src/app/services/data-access..service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.page.html',
  styleUrls: ['./my-listings.page.scss'],
})
export class MyListingsPage implements OnInit {
  user;
  data;
  constructor(private router:Router, 
    private dataSvc:DataAccessService, 
    private authSvc:AuthenticationService) { 

    this.authSvc.getUser().subscribe(user => {
      this.user = user; 
      this.dataSvc.getListings(this.user.uid).subscribe(result=>{
        console.log(result)
        this.data = result;
      })
    });
     
  }

  ngOnInit() {
  }

  addNewListing(){
    this.router.navigate(['my-listings-add']);
  }

}
