import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { ContactPage } from '../contact/contact';
import { NewsPage } from '../news/news';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingsPage;
  tab3Root = NewsPage;
  tab4Root = ContactPage;

  constructor() {

  }
}
