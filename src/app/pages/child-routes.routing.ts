import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}},
]




@NgModule({
  imports: [ RouterModule.forChild(childRoutes)],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
