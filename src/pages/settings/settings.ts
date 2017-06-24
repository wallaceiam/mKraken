import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';

// import * as urlParser from 'url-parse';
// import * as qs from 'querystringify';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  apiKey: string;
  privateKey: string;

  constructor(public navCtrl: NavController, private storage: Storage, 
    private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController) {
    this.storage.get('apiKey').then(
        v => this.apiKey = v
    );
    this.storage.get('privateKey').then(
      v => this.privateKey = v
    );
  }

  apiKeyChanged() {
    this.storage.set('apiKey', this.apiKey);
  }

  privateKeyChanged() {
    this.storage.set('privateKey', this.privateKey);
  }

  scanQrCode() {
    
    this.barcodeScanner.scan( ).then((barcodeData) => {
      
      if(barcodeData.cancelled || barcodeData.format !== 'QR_CODE') {
        return;
      }
      
      const regex = /kraken:\/\/apikey\?key=(.*?)&secret=(.*)/i;
      // let m = regex.exec(barcodeData.text);

      let output = regex.exec(barcodeData.text);

      if(output) {
        this.apiKey = output[1];
        this.privateKey = output[2];
      }

      this.apiKeyChanged();
      this.privateKeyChanged();
      

    }, (err) => {
        this._displayAlert(err);
    });
  }

  private _displayAlert(msg: any) {
    let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: msg,
        buttons: ['OK']
      });
      alert.present();
  }
}
