import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CurrentHoldings, Holding } from './../../models/balance';

@Component({
    selector: 'page-coint',
    templateUrl: 'coin.html'
})
export class CoinPage implements OnInit {
    currentHoldings: CurrentHoldings;
    holding: Holding;

    constructor(public navCtrl: NavController, private navParams: NavParams) {
         this.currentHoldings = navParams.get('currentHoldings');
         this.holding = navParams.get('item');
     }

    ngOnInit() { }

    goBack() {
        this.navCtrl.pop();
    }

}