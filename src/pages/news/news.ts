import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Feed, FeedEntry } from './../../models/news';
import { NewsService } from './../../services/news.service';
import { NewsItemPage } from './newsitem';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage implements OnInit {

    news: Feed;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private newsService: NewsService) {

  }

  ngOnInit() {
      this.refresh(null);
  }

  refresh(refresher: any) {
      this.newsService.getNews().subscribe(
          n => this.news = n,
          e => {},
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

    openNewsItem(item: FeedEntry) {
        console.log('Opening: ' + item);
        this.navCtrl.push(NewsItemPage, { item: item })
            .then((v) => { console.log('Pushed'); })
            .catch(e => { console.error(e); this.displayError(e); })
    }

}
