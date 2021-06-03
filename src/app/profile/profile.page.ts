import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public photoService: PhotoService) { }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
/*
  async ngOnInit() {
    await this.photoService.loadSaved();
  }
  */
  ngOnInit() { }


}
