import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { LoginComponent } from './auth/login/login.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { QuoteComponent } from './components/quote/quote.component';

const routes: Routes = [
  //usar para redirigir a /login y usar child routes.
  { path: '', redirectTo: '/login', pathMatch:'full'},

  //{ path: '**', component: NotFoundComponent}
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'orders',
    component: OrdersPageComponent
  },
  {
    path: 'orders/new',
    component: CreateOrderComponent
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent
  },
  {
    path: 'clients/new',
    component: CreateClientComponent
  },
  {
    path: 'quote/:id',
    component: QuoteComponent
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
