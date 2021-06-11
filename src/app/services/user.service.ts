import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AppUser } from './../models/AppUser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class UserService {
  private usersDB: AngularFirestoreCollection<AppUser>;
  private usersDB$: Observable<AppUser[]>;
  private userfilesDB: AngularFireStorage;

  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService,
    private afs: AngularFireStorage,
    ) {
      this.usersDB = this.db.collection<AppUser>('users');
      this.usersDB$ = this.usersDB.valueChanges();
      this.userfilesDB = this.afs;
    }

    private filterValues(obj) {
      for (let prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '')
          delete obj[prop];
      }
      return obj;
    }

    getMyUsers(): Observable<AppUser[]> {
      return this.usersDB$;
    }

    getUserFilesDB() {
      return this.userfilesDB;
    }

    getUserCredentials() {
      return JSON.parse(localStorage.getItem('user'));
    }

    getUserID() {
      return JSON.parse(localStorage.getItem('user')).uid;
    }

    uploadingImage(image) {
      let uid = this.getUserID();
      return this.userfilesDB.upload(`/${uid}/profileImg-${Date.now()}`, image);
    }

    uploadingdpImage(image) {
      let uid = this.getUserID();
      return this.userfilesDB.upload(`/${uid}/dpImg-${Date.now()}`, image);
    }
  
}

function getUserID() {
  throw new Error('Function not implemented.');
}
