import { Component,NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Todos } from '../../providers/todos';

@Component({
  selector: 'page-clou-do',
  templateUrl: 'clou-do.html'
})
export class ClouDOPage {

  todos: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public todoService: Todos, 
              public alertCtrl: AlertController,
              private _zone: NgZone) {}

  ionViewDidLoad() {
    //Zone Run Refresaca la pagina
     this.todoService.getTodos().subscribe((data) => {
      this._zone.run(() => this.todos = data);
    });
  }


  createTodo(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.createTodo({title: data.title});
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
  updateTodo(todo){
 
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              title: data.title
            });
          }
        }
      ]
    });
 
    prompt.present();
  }
 
  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
  }

}
