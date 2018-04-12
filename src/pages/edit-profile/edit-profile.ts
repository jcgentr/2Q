import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
	gender;
  age:number;
  major;
  year;
  imageurl;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.imageurl = "../../assets/imgs/profile.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  saveProfile() {
  	console.log("Saving Profile...");

  }

  takePicture(){
  	console.log("Taking Picture...");
  }
}
