import { Component } from '@angular/core';

import { MisRegistrosPage } from '../mis-registros/mis-registros';
import { ListaRegistrosPage } from '../lista-registros/lista-registros';
import { MapaGeneralPage } from '../mapa-general/mapa-general';
import { HomePage } from '../home/home';
import { MenuPage } from '../../pages/menu/menu';
import { Keyboard } from '@ionic-native/keyboard';
import { Events, Tabs, NavController, App } from 'ionic-angular';


@Component({
   templateUrl: 'tabs.html'
})
export class TabsPage {

   tab1Root = HomePage;
   tab2Root = MisRegistrosPage;
   tab3Root = MenuPage;
   valueforngif = true;

   constructor(private keyboard: Keyboard,
      public navCtrl: NavController,
      public app: App,
      public events: Events) {

   }

   public tapped() {
      this.app.getRootNav().push(HomePage,{},{duration: 700});
  }
}
