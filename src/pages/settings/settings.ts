import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  apiKey: string;
  privateKey: string;

  constructor(public navCtrl: NavController, private storage: Storage) {
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

}
