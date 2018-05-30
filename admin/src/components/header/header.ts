import { Component,Input } from '@angular/core';

@Component({
  selector: 'headeradmin',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input() titulo:string;
}
