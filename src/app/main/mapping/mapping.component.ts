import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log('configured routes: ', this.router.config);
  }

}
