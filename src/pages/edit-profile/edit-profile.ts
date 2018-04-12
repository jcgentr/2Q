import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  constructor(private camera: Camera, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
  	this.imageurl = "../../assets/imgs/profile.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  saveProfile() {
  	console.log("Saving Profile...");

  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       this.imageurl = base64Image;

    }, (err) => {
       // The picture failed.
        let alertt = this.alertCtrl.create({
          title: 'Picture Failed!',
          buttons: ['Dismiss']
        });
        alertt.present();
    });
  }


}
