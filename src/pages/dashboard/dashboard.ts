import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  gender;
  age;
  major;
  year;
  firstName;
  lastName;
  items: any = [];

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider) {
    this.items = this.dataService.getUserProfile();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }


  presentStream() {
  	let streamModal = this.modalCtrl.create(HomePage, { });
   	streamModal.present();
  }

  editProfile() {
  	this.navCtrl.push(EditProfilePage);
  }

}
