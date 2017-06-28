import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Feed } from './../models/news';

@Injectable()
export class NewsService {
    constructor( @Inject('newsEndPoint') private apiEndPoint: string, private http: Http, private storage: Storage) { }

    getNews(): Observable<Feed> {
        let cacheHitObj = Observable.fromPromise(this.storage.get('newsInfo'))

        return cacheHitObj.switchMap(hit => {

            let now = new Date();
            if (hit && hit.dt && (now.valueOf() - new Date(hit.dt).valueOf()) / 1000 < 60) {
                return Observable.of(hit.result as Feed);
            }
            //return this.getFeedContent('http://blog.kraken.com/rss');
            return this.http.get(this.apiEndPoint + 'http://blog.kraken.com/rss')
                .map(this.extractFeeds)
                .map(this.fixThumbnails)
                .map(f => {
                    this.storage.set('newsInfo', { dt: new Date(), result: f });
                    return f;
                })
                .catch(this.handleError);
        });
    }

    getFeedContent(url: string): Observable<Feed> {
        return this.http.get(this.apiEndPoint + url)
            .map(this.extractFeeds)
            .map(this.fixThumbnails)
            .catch(this.handleError);
    }

    private extractFeeds(res: Response): Feed {
        let feed = res.json();
        return feed || {};
    }

    private fixThumbnails(feed: Feed): Feed {
        if (feed && feed.items) {
            const regex = new RegExp(/<figure.*?><img.*?src=\"(.*?)\"/, 'i');
            feed.items.filter(f => !f.thumbnail || f.thumbnail === '')
                .map(f => {
                    regex.exec(f.description).forEach((match, groupIndex) => {
                        f.thumbnail = match;
                    });
                })
        }
        return feed;
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}