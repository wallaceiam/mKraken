import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FeedEntry } from './../../models/news';

@Component({
    selector: 'page-newsitem',
    templateUrl: 'newsitem.html'
})
export class NewsItemPage implements OnInit {
    newsItem: FeedEntry;

    constructor(public navCtrl: NavController, private navParams: NavParams) {
         this.newsItem = navParams.get('item');
     }

    ngOnInit() { }

    goBack() {
        this.navCtrl.pop();
    }

    openLink(url: string) {
        window.open(url, '_system');
    }
}