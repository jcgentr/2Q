import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	  item: any;
    items: any = [];
    question;
    ans1;
    ans2;
    ans3;
    cAns;
    index=-1;

    testRadioOpen = false;
    testRadioResult: any;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public dataService: DataProvider) {
  		this.items = this.dataService.getQuestions();
      
  }

  ionViewDidLoad(){
    // this.cAns = this.items[0].cAns;
   
  }

  recordAnswer(ans){
  	console.log("Answer is " + ans);
  	console.log("Correct answer was " + this.items[0].cAns);
  	if(this.items[0].cAns == ans) {
  		console.log("Moving on to next question");
  	}
  }

  prev(){
    this.index -= 1;
    if(this.index < 0){
      this.index = 0;
    }
    console.log(this.index);
    this.question = this.items[this.index].question;
    this.ans1 = this.items[this.index].ans1;
    this.ans2 = this.items[this.index].ans2;
    this.ans3 = this.items[this.index].ans3;
    this.cAns = this.items[this.index].cAns;
  }
  next(){
    this.index += 1;
    if(this.index > 1){
      this.index = 1;
    }
    console.log(this.index);
    this.question = this.items[this.index].question;
    this.ans1 = this.items[this.index].ans1;
    this.ans2 = this.items[this.index].ans2;
    this.ans3 = this.items[this.index].ans3;
    this.cAns = this.items[this.index].cAns;
    
  }

  // presentAlert() {
    
  //   let alert = this.alertCtrl.create();
  //   alert.setTitle(this.items[0].question);

  //   alert.addInput({
  //     type: 'radio',
  //     label: this.items[0].ans1,
  //     value: 'red',
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: this.items[0].ans2,
  //     value: 'green'
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: this.items[0].ans3,
  //     value: 'blue'
  //   });
   

  //   alert.addButton('Cancel');
  //   alert.addButton({
  //     text: 'Ok',
  //     handler: (data: any) => {
  //       console.log('Radio data: ', data);
  //       this.testRadioOpen = false;
  //       this.testRadioResult = data;
  //     }
  //   });

  //   alert.present();
  // }

}
