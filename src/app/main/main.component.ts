import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor() { }

  ngOnInit() {
    // add the the body classes
    this.body.classList.add('skin-red-light'); // skin-black-light
    this.body.classList.add('sidebar-mini');
    this.body.classList.add('sidebar-collapse');

    this.body.classList.remove('login-page');
  }

   ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-red-light');
    this.body.classList.remove('sidebar-mini');
  }

}
