import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  loader: any;
  isLoading = false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public router: Router,
    private navCtrl: NavController,
  ) {}

  async toast(msg, color, positon) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color ? color : 'primary',
      position: positon
    });
    toast.present();
  }

  async errorToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
