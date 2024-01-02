import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch:'full'},

  //{ path: '**', component: NotFoundComponent}


  {
    path: 'orders',
    component: OrdersPageComponent
  },
  {
    path: 'orders/new',
    component: CreateOrderComponent
  },
  {
    path: 'customers/new',
    component: CreateCustomerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
