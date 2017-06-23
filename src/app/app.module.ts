import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SumPipe } from '../pipes/sum.pipe';

import { KrakenService} from '../services/kraken.service';

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    ContactPage,
    HomePage,
    TabsPage,

    SumPipe
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
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    KrakenService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // {provide: 'apiEndPoint', useValue: 'http://localhost:8100/api' }
     {provide: 'apiEndPoint', useValue: 'https://api.kraken.com' }
  ]
})
export class AppModule {}
