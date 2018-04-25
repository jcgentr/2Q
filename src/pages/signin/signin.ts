import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Parse } from 'parse';
import { Facebook } from '@ionic-native/facebook';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

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

  constructor(private push: Push, private facebook: Facebook, public events: Events, public alertCtrl: AlertController, public navCtrl: NavController, public data: DataProvider, private loadCtrl: LoadingController) { 
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
    this.pushIt();

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

  pushIt(){
    // to check if we have permission
    this.push.hasPermission().then((res: any) => {

      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }

    });

    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    this.push.createChannel({
    id: "testchannel1",
    description: "My first test channel",
    // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
    importance: 3
    }).then(() => console.log('Channel created'));

    // Delete a channel (Android O and above)
    this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

    // Return a list of currently configured channels
    this.push.listChannels().then((channels) => console.log('List of channels', channels))

    // to initialize push notifications
    const options: PushOptions = {
    android: {
      senderID: '985974787898'
    },
    ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
    },
    windows: {},
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }



}
