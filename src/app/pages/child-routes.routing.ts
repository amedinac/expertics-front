import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateOrderComponent } from '../components/create-order/create-order.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}},
  //{ path: 'orders/new', component: CreateOrderComponent}
]




@NgModule({
  imports: [ RouterModule.forChild(childRoutes)],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
