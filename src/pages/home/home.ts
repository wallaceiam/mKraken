import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from 'ionic-angular';

import { KrakenService } from './../../services/kraken.service';
import { CurrentHoldings, Holding } from './../../models/balance';
import { Assets } from './../../models/asset';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  currentHoldings: CurrentHoldings = new CurrentHoldings();
  assetInformation: Assets;

  constructor(public navCtrl: NavController, private storage: Storage, private toastCtrl: ToastController, private kraken: KrakenService) {
  }

  ngOnInit() {
    this.refresh(null);
  }

  refresh(refresher: any) {

    this.kraken.getAssetInfo()
      .subscribe(a => {
        this.assetInformation = a;
      });

    this.kraken.getOverview().subscribe(
      currentHoldings => {
        this.currentHoldings = currentHoldings;
        this.currentHoldings.holdings = this.currentHoldings.holdings.sort(this._sort)
      },
      e => { 
        if(refresher) {
          refresher.complete();
        } 
        this.displayError(e);
       },
      () => { 
        if(refresher) {
          refresher.complete();
        } 
      }
    );
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

  private _sort(a: Holding, b: Holding): number {
    return b.currentValue - a.currentValue;
  }

}
