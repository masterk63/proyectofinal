import { Component,Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from './../../providers/login/login';
import { HomePage } from './../../pages/home/home';


@Component({
  selector: 'page-sideMenu',
  templateUrl: 'sideMenu.html'
})
export class SideMenu {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  @Input() altura;

  constructor(public navCtrl: NavController,
              public loginProviderCtrl:LoginProvider,
              public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SideMenu, {
      item: item
    });
  }

  public logout(){
      console.log('saliendo logout');
      this.loginProviderCtrl.logout().then(()=>{
      console.log('listo borrado, dirijiendo al login');
      this.navCtrl.setRoot(HomePage);
      });
  }



}
