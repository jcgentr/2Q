import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Parse } from 'parse';
import { Events} from 'ionic-angular';

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

  constructor(private camera: Camera, public events: Events, public navCtrl: NavController, public view: ViewController, public alertCtrl: AlertController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.gender = this.navParams.get('items')[0].gender;
    console.log(this.gender);
    this.age = this.navParams.get('items')[0].age;
    this.major = this.navParams.get('items')[0].major;
    this.imageurl = this.navParams.get('items')[0].imageurl;
    console.log(this.imageurl);
    this.year = this.navParams.get('items')[0].year;
  }

  saveProfile() {
    console.log("Saving Profile...");
    console.log(this.gender);
    console.log(this.age);
    var user = Parse.User.logIn("jg", "jg", {
      success: function(user) { 
      }
    });
    var curr=Parse.User.current();
    console.log(curr.id);
    curr.set("gender", this.gender);
    curr.set("age", this.age);
    curr.set("major",this.major);
    curr.set("year", this.year);
    curr.set("imageurl", this.imageurl);
    curr.save(null, {
      success: function(profile) {
        console.log("UPDATED PROFILE");
      }
    });
    let updateProfile = {
      gender: this.gender,
      age: this.age,
      major: this.major,
      year: this.year,
      imageurl: this.imageurl
    }; 
    this.events.publish('updateProfile',updateProfile);
    this.view.dismiss();
    
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    cameraDirection: 1
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
