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

    testRadioOpen = false;
    testRadioResult: any;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public dataService: DataProvider) {
  		this.items = this.dataService.getQuestions();
  }

  recordAnswer(ans){
  	console.log("Answer is " + ans);
  	console.log("Correct answer was " + this.items[0].cAns);
  	if(this.items[0].cAns == ans) {
  		console.log("Moving on to next question");
  	}
  }

  presentAlert() {
    // let alert = this.alertCtrl.create({
    //   title: this.items[0].question,
    //   subTitle: 'Question 1',
    //   buttons: [
    //     {
    //       text: this.items[0].ans1,
    //       handler: () => {
    //         console.log('Ans1 clicked');
    //       }
    //     },
    //     {
    //       text: this.items[0].ans2,
    //       handler: () => {
    //         console.log('Ans2 clicked');
    //       }
    //     },
    //     {
    //       text: this.items[0].ans3,
    //       handler: () => {
    //         console.log('Ans3 clicked');
    //       }
    //     }
    //    ]
    // });

    // alert.present();

    let alert = this.alertCtrl.create();
    alert.setTitle(this.items[0].question);

    alert.addInput({
      type: 'radio',
      label: this.items[0].ans1,
      value: 'red',
    });

    alert.addInput({
      type: 'radio',
      label: this.items[0].ans2,
      value: 'green'
    });

    alert.addInput({
      type: 'radio',
      label: this.items[0].ans3,
      value: 'blue'
    });
   

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data: ', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present();
  }

}
