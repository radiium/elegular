import { Component } from '@angular/core';
// import * as fs from 'fs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'elegular';
  fs: any; // typeof fs;

  constructor() {
    // this.fs = window.require('fs');
    console.log('Test');
    console.log(this.fs);
  }
}
