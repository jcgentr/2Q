import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Parse } from 'parse';

// Providers
// import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  password: string = '';
  username: string = '';
  verify: string = '';
  email: string = '';

  constructor(public navCtrl: NavController, private loadCtrl: LoadingController) { }

  ionViewDidLoad() {
    console.log('Initiate Signup');
  }

  // TODO: form validation
  public doRegister() {
    let loader = this.loadCtrl.create({
      content: 'Signing up...'
    });
    loader.present();

    var user = new Parse.User();
      user.set("username", this.username);
      user.set("password", this.password);
      user.set("email", this.email);

      // other fields can be set just like with Parse.Object
      //user.set("phone", "415-392-0202");

      var self=this;
      user.signUp(null, {
        success: function(user) {
          loader.dismissAll();
          // Hooray! Let them use the app now.
          console.log("signup success "+user.get("username"));
          self.navCtrl.pop();
        },
        error: function(user, error) {
          loader.dismissAll();
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });


    console.log("sign up");

  }

}
