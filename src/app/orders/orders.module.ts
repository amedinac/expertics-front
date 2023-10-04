import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { NewOrderPageComponent } from './pages/new-order-page/new-order-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OrdersTableComponent,
    OrdersPageComponent,
    NewOrderPageComponent,
    CreateOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    OrdersTableComponent,
    OrdersPageComponent,
    NewOrderPageComponent,
    CreateOrderComponent
  ]
})
export class OrdersModule { }
