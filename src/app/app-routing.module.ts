import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersPageComponent } from './orders/pages/orders-page/orders-page.component';
import { NewOrderPageComponent } from './orders/pages/new-order-page/new-order-page.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch:'full'},

  //{ path: '**', component: NotFoundComponent}


  {
    path: 'orders',
    component: OrdersPageComponent
  },
  {
    path: 'orders/new',
    component: NewOrderPageComponent
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
