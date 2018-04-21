import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Parse } from 'parse';
import { Facebook } from '@ionic-native/facebook';

// Providers
import { DataProvider } from '../../providers/data/data';

// Pages
import { SignupPage } from '../signup/signup';
import { DashboardPage } from '../dashboard/dashboard';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  registerPage = SignupPage;
  password: string = '';
  username: string = '';
  users: any;
  isLoggedIn:boolean=false;

  constructor(private facebook: Facebook, public events: Events, public alertCtrl: AlertController, public navCtrl: NavController, public data: DataProvider, private loadCtrl: LoadingController) { 
    facebook.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('Initiated Signin');
  }

  public doSignin() {
    let loader = this.loadCtrl.create({
      content: 'Signing in...'
    });
    loader.present();
    var self=this;
    Parse.User.logIn(this.username,this.password,{
      success: function(user) {
        self.navCtrl.setRoot(DashboardPage);
        loader.dismissAll();
        console.log("user: " + user.get("username") + " signed in.");
        
      },
      error: function(user, error) {
        // The login failed.
        let alertt = self.alertCtrl.create({
          title: 'Invalid Login! Incorrect Username and/or Password!',
          buttons: ['Dismiss']
        });
        alertt.present();
        loader.dismissAll();
        
        //alert('Failed to create new object, with error code: ' + error.message);
        
      }

    });
  }
  getUserDetail(userid) {
    this.facebook.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

  loginWithFB() {
    this.facebook.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
  logoutWithFB() {
    this.facebook.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

}
