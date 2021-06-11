import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataAccessService } from 'src/app/services/data-access..service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user;
  data;
  userId;
  constructor(private router:Router, 
    private dataSvc:DataAccessService, 
    private authSvc:AuthenticationService,
    private firestore:AngularFirestore) { 

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
  

}
