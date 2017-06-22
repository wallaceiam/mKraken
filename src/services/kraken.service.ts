import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

// import { Hash, HMAC } from "fast-sha256";
import * as CryptoJS from 'crypto-js';

import { Balance } from './../models/balance';
import { Assets, Asset } from './../models/asset';
import { TickerInformation, Ticker, TickerPoint, TickerTradePoint } from './../models/ticker';

declare const Buffer;

@Injectable()
export class KrakenService {

    private accountBalanaceUrl: string = '/0/private/Balance';
    private assetsUrl: string = '/0/public/Assets';
    private tickerInformationUrl: string = '/0/public/Ticker'

    constructor( @Inject('apiEndPoint') private apiEndPoint: string, private http: Http) { }

    getBalance(apiKey: string, privateKey: string): Observable<Balance[]> {

        if (!privateKey || privateKey.length < 1) {
            return Observable.of(new Array<Balance>());
        }

        if (!apiKey || apiKey.length < 1) {
            return Observable.of(new Array<Balance>());
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('API-Key', apiKey);

        let now = new Date().getTime();
        let nonce: number = now * 1000;
        let postdata: string = nonce.toString();
        postdata += (postdata === nonce.toString() ? '' : '&') + 'nonce=' + nonce;

        let sign = this._getMessageSignature(apiKey, this.accountBalanaceUrl, postdata, nonce.toString(), privateKey);
        headers.append('API-Sign', sign)

        return this.http.post(
            this.apiEndPoint + this.accountBalanaceUrl,
            'nonce=' + nonce,
            new RequestOptions({
                headers: headers
            }))
            .map(res => {
                let body = res.json();
                return body || {};
            })
            .map(res => {
                if (res.error && res.error.length > 0) {
                    Observable.throw(res.error);
                }

                let balances = new Array<Balance>();
                if (res.result) {

                    Object.keys(res.result).forEach(key => {
                        let cur = key;
                        while (cur.length > 3 && cur[0] === 'X') {
                            cur = cur.substring(1, cur.length);
                        }

                        let val = +res.result[key];
                        balances.push(new Balance(key, cur, +val));
                    });
                }
                return balances;
            });

    }

    getAssetInfo(): Observable<Assets> {
        // https://api.kraken.com/0/public/Assets

        return this.http.get(
            this.apiEndPoint + this.assetsUrl,
        )
            .map(res => {
                let body = res.json();
                return body || {};
            })
            .map(res => {
                if (res.error && res.error.length > 0) {
                    Observable.throw(res.error);
                }

                let assets = new Assets();
                if (res.result) {
                    // "aclass":"currency",
                    // "altname":"DASH",
                    // "decimals":10,
                    // "display_decimals":5
                    Object.keys(res.result).forEach(key => {
                        let val = res.result[key];
                        assets[key] = new Asset(
                            val['aclass'],
                            val['altname'],
                            +val['decimals'],
                            +val['display_decimals']
                        );
                    });
                }
                return assets;
            });
    }

    getTickerInformation(balances: Balance[]): Observable<TickerInformation> {
        //  https://api.kraken.com/0/public/Ticker

        let pairs = 'pair=XBTGBP,';
        pairs += balances
            .filter(b => b.displayCurrency !== 'XBT' && b.displayCurrency !== 'GBP')
            .map(b => b.displayCurrency + 'XBT').join(',');

        // let headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let url = this.apiEndPoint + this.tickerInformationUrl + '?' + pairs;
        console.log(url);

        return this.http.get(url)
            .map(res => {
                let body = res.json();
                return body || {};
            })
            .map(res => {
                if (res.error && res.error.length > 0) {
                    Observable.throw(res.error);
                }

                let ticker = new TickerInformation();
                if (res.result) {

                    Object.keys(res.result).forEach(key => {
                        let val = res.result[key];
                        ticker[key] = this._mapToTicker(val);
                    });
                }
                return ticker;
            });

    }
    
    private _mapToTickerTradePoint(val: any): TickerTradePoint {
        return new TickerTradePoint(+val[0], +val[1], +val[2]);
    }

    private _mapToTickerPoint(val: any): TickerPoint {
        return new TickerPoint(+val[0], +val[1]);
    }

    private _mapToTicker(val: any): Ticker {
        let ticker = new Ticker();
        ticker.ask = this._mapToTickerTradePoint(val['a']);
        ticker.bid = this._mapToTickerTradePoint(val['b']);
        ticker.lastTradeClosed = new TickerTradePoint(+val['c'][0], +val['c'][1]);
        ticker.volume = this._mapToTickerPoint(val['v']);
        ticker.volumeWeightedAveragePrice = this._mapToTickerPoint(val['p']);
        ticker.numberOfTrades = this._mapToTickerPoint(val['t']);
        ticker.low = this._mapToTickerPoint(val['l']);
        ticker.high = this._mapToTickerPoint(val['h']);
        ticker.opening = +val['o'];
        return ticker;
    }

    private _getMessageSignature(apiKey: string, path: string, postdata: any, nonce: string, privateKey: string) {
        //API-Sign = Message signature using HMAC-SHA512 of 
        // (URI path + SHA256(nonce + POST data)) and base64 decoded secret API key

        // var message = querystring.stringify(request);
        // var secret = new Buffer(privateKey, 'base64');
        // // var hash = crypto.createHash('sha256');
        // const hasher = new Hash();
        // // var hmac = crypto.createHmac('sha512', secret);
        // const hmac = new HMAC(secret);

        // // var hashDigest = hash.update(nonce + message).digest('binary');
        // let hasDigest = hasher.update(nonce + message).digest();
        // // var hmacDigest = hmac.update(path + hashDigest, 'binary').digest('base64');
        // let hmacDigest = hmac.update(new Buffer(path) + hasDigest).digest();
        // var hmacDigestBase64 = btoa(String.fromCharCode.apply(null, hmacDigest));

        // return hmacDigestBase64;

        var hash_digest = CryptoJS.SHA256(postdata);
        var debase64PrivateKey = CryptoJS.enc.Base64.parse(privateKey);
        var message = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Latin1.parse(path)) + hash_digest.toString();
        var hmac_digest = CryptoJS.HmacSHA512(CryptoJS.enc.Hex.parse(message), debase64PrivateKey);
        var signature = CryptoJS.enc.Base64.stringify(hmac_digest);
        return signature;
    }
}
