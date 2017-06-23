import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Feed, FeedEntry } from './../../models/news';
import { NewsService } from './../../services/news.service';
import { NewsItemPage } from './newsitem';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {

    news: Feed;

  constructor(public navCtrl: NavController, private newsService: NewsService) {

  }

  refresh(refresher: any) {
      this.newsService.getNews().subscribe(
          n => this.news = n,
          e => {},
          () => {
              console.log(this.news);
              refresher.complete();
          }
      );
    }

    openNewsItem(item: FeedEntry) {
        this.navCtrl.push(NewsItemPage, { item: item });
    }

}
