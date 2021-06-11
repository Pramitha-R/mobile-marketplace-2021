import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, mergeAll, zipAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  usersid;
  constructor(private afs:AngularFirestore) { }

  addListing(userId, listing) {
   
     return this.afs.collection<any>(`userListings/${userId}/listings`).add(listing);
     
  }

  getListings(userId){
    return this.afs.collection<any>(`userListings/${userId}/listings`).valueChanges();
  }

  addprofileListing(userId, profilelisting) {
    return this.afs.collection<any>(`profileListing/${userId}/dplistings`).add(profilelisting);
  }

  getdpListings(userId){
    return this.afs.collection<any>(`profileListing/${userId}/dplistings`).valueChanges();
  }
}
function data() {
  throw new Error('Function not implemented.');
}

