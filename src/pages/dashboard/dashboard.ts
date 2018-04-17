import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { DataProvider } from '../../providers/data/data';
import { Events} from 'ionic-angular';
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
  imageurl;
  items: any = [];

  constructor(public events: Events, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider) {
    this.items = this.dataService.getUserProfile();
    this.events.subscribe("updateProfile", (updateProfile) => {
      this.items[0].gender = updateProfile.gender;
      this.items[0].age = updateProfile.age;
      this.items[0].year = updateProfile.year;
      this.items[0].major = updateProfile.major;
      this.items[0].imageurl = updateProfile.imageurl;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    
  }


  presentStream() {
  	let streamModal = this.modalCtrl.create(HomePage, { });
   	streamModal.present();
  }

  editProfile() {
  	this.navCtrl.push(EditProfilePage,{
      items: this.items
    });
  }

}
