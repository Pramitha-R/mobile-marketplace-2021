import { UserService } from './user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserListingsService {
  private userFilesDB: AngularFireStorage;
  private uid;

  constructor(
    private afs: AngularFireStorage,
    private  userService: UserService
  ) { 
    this.userFilesDB = afs;
    this.uid = userService.getUserID();
  }

  addItem() {
    // Add an item
  }

  deleteItem() {
    // Delete an item
  }

  getAnItem() {
    // Take one item
  }

  getAllItems() {
    // get all the items
  }
}