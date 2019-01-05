import { MainComponent } from './../main.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MappingComponent } from '../mapping/mapping.component';
import { AuthGuard } from '../../_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'main',
        component: MainComponent,
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          {
            path: 'home',
            component: HomeComponent, canActivate: [AuthGuard]
          },
          {
            path: 'mapping',
            component: MappingComponent, canActivate: [AuthGuard]
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }