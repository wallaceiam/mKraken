import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { DecimalPipe, CurrencyPipe } from '@angular/common';

import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { ContactPage } from '../pages/contact/contact';
import { NewsPage } from '../pages/news/news';
import { NewsItemPage } from '../pages/news/newsitem';
import { HomePage } from '../pages/home/home';
import { CoinPage } from '../pages/coin/coin';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SumPipe } from '../pipes/sum.pipe';
import { ProfiteLossPipe, ProfiteLossPercentPipe, TotalProfiteLossPipe, TotalProfiteLossPercentPipe } from './../pipes/profitloss.pipe';
import { CryptoCurrencyPipe } from '../pipes/cryptocurrency.pipe';

import { KrakenService} from '../services/kraken.service';
import { NewsService } from '../services/news.service';

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    ContactPage,
    NewsPage,
    NewsItemPage,
    HomePage,
    CoinPage,
    TabsPage,

    SumPipe,
    ProfiteLossPipe, ProfiteLossPercentPipe, TotalProfiteLossPipe, TotalProfiteLossPercentPipe,
    CryptoCurrencyPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    ContactPage,
    NewsPage,
    NewsItemPage,
    HomePage,
    CoinPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,

    KrakenService,
    NewsService,

    DecimalPipe,
    CurrencyPipe,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
      {provide: 'apiEndPoint', useValue: 'http://localhost:8100/api' },
    // {provide: 'apiEndPoint', useValue: 'https://api.kraken.com' },


    {provide: 'newsEndPoint', useValue: 'http://rss2json.com/api.json?rss_url=' },
    // {provide: 'newsEndPoint', useValue: 'http://localhost:8100/news' }
  ]
})
export class AppModule {}
