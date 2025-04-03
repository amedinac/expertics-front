import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../shared/header/header.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { UpdateCustomerComponent } from '../components/update-customer/update-customer.component';
import { QuoteComponent } from './quote/quote.component';
import { AddPartComponent } from '../components/add-part/add-part.component';
import { DeviceCardComponent } from '../components/device-card/device-card.component';
import { ClientCardComponent } from '../components/client-card/client-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    OrdersPageComponent,
    OrderDetailComponent,
    UpdateCustomerComponent,
    QuoteComponent,
    AddPartComponent,
    DeviceCardComponent,
    ClientCardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class PagesModule { }
