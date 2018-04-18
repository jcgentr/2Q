import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parse } from 'parse';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
private parseAppId: string = 'NpH5AmRvNkoQuZBOS5EE3BB0LfXotZPOJ5PXQLye';
private parseJSKey: string= 'WXlviqIK07kp9khmfyNYLoxpDM0DsKuFYIKdEbXv';
private parseServerUrl: string = 'https://parseapi.back4app.com/';
items = [];

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');

    Parse.initialize(this.parseAppId, this.parseJSKey);
    Parse.serverURL = this.parseServerUrl;

    console.log('Initiated Parse');
    const Questions = Parse.Object.extend('Questions');

    let query = new Parse.Query(Questions);
    query.limit(1000);

    query.find().then((questions) => {
      // resolve(menus);
      console.log(questions.length);
    }, (error) => {
      //reject(error);
      console.log("error");
    });

    // subscribe to my query
    var client = new Parse.LiveQueryClient({
      applicationId: 'NpH5AmRvNkoQuZBOS5EE3BB0LfXotZPOJ5PXQLye',
      serverURL: 'wss://' + 'livedatingapp.back4app.io', // Example: 'wss://livequerytutorial.back4app.io'
      javascriptKey: 'WXlviqIK07kp9khmfyNYLoxpDM0DsKuFYIKdEbXv',
      masterKey: 'SQ99SHS01n5NNX0XztCkr3zbGFFNzpzUFAwr0h8x'
    });
    client.open();

  }

  getQuestions() {
    const Questions = Parse.Object.extend('Questions');

    let query = new Parse.Query(Questions);
    query.limit(1000);
    var items=[];

    query.find().then((questions) => {
      // resolve(menus);
      console.log(questions.length);
      
      
      for (var i = 0; i < questions.length; ++i) {
          var myquestions = {
            question: questions[i].get("Qtitle"),
            ans1: questions[i].get("Ans1"),
            ans2: questions[i].get("Ans2"),
            ans3: questions[i].get("Ans3"),
            cAns: questions[i].get("correctAns")
          }
         
          items.push(myquestions);
      }
      console.log("questions loaded");

    }, (error) => {
      //reject(error);
      console.log("error");
    });

    return items;
    
  }

  getUserProfile() {
    var items=[];
    var currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        var myprofile = {
            firstName: currentUser.get("firstName"),
            lastName:currentUser.get("lastName"),
            gender: currentUser.get("gender"),
            major: currentUser.get("major"),
            age: currentUser.get("age"),
            year: currentUser.get("year"),
            imageurl: currentUser.get("imageurl")
          }
          items.push(myprofile);
          console.log("profile loaded");
    } else {
        // show the signup or login page
        console.log("could not get current user");
    }

    return items;
    
  }

}
