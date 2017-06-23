import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from 'ionic-angular';

import { KrakenService } from './../../services/kraken.service';
import { Balance } from './../../models/balance';
import { Ticker } from './../../models/ticker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  balances: Balance[];
  xbtGbp: Ticker;

  constructor(public navCtrl: NavController, private storage: Storage, private toastCtrl: ToastController, private kraken: KrakenService) {

  }

  refresh(refresher: any) {
    this.kraken.getAssetInfo()
      .subscribe(a => {
        console.log(a);
      });

    this.storage.get('apiKey').then(apiKey => {
      this.storage.get('privateKey').then(privateKey => {
        this.kraken.getBalance(apiKey, privateKey)
          .subscribe(b => {
            console.log(b);
            this.balances = b;
            this.kraken.getTickerInformation(this.balances)
              .subscribe(ti => {
                Object.keys(ti).forEach(key => {
                  if (key === 'XXBTZGBP') {
                    this.xbtGbp = ti[key];
                  } else {
                    this.balances.forEach(b => {
                      if (key === b.currency + 'XBT' || key === b.currency + 'XXBT') {
                        b.ticker = ti[key];
                      }
                    })
                  }
                });

                console.log(this.balances);
              });
          },
          e => { this.displayError(e); },
          () => { refresher.complete(); });
      });
    });
  }

  displayError(err: any) {
    let toast = this.toastCtrl.create({
      message: err,
      duration: 3000,
      position: 'top',
      cssClass: 'warning'
    });
    toast.present();
  }

}
