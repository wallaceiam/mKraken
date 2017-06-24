import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Feed, FeedEntry } from './../../models/news';
import { NewsService } from './../../services/news.service';
import { NewsItemPage } from './newsitem';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage implements OnInit {

    news: Feed;

  constructor(public navCtrl: NavController, private newsService: NewsService) {

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

    openNewsItem(item: FeedEntry) {
        this.navCtrl.push(NewsItemPage, { item: item });
    }

}
