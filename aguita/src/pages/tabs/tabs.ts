import { Component } from '@angular/core';

import { MisRegistrosPage } from '../mis-registros/mis-registros';
import { MapaGeneralPage } from '../mapa-general/mapa-general';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MisRegistrosPage;
  tab3Root = MapaGeneralPage;

  constructor() {

  }
}
