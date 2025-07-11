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
import { UpdateClientComponent } from '../components/update-client/update-client.component';
import { QuoteComponent } from '../components/quote/quote.component';
import { AddPartComponent } from '../components/add-part/add-part.component';
import { DeviceCardComponent } from '../components/device-card/device-card.component';
import { ClientCardComponent } from '../components/client-card/client-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    OrdersPageComponent,
    OrderDetailComponent,
    UpdateClientComponent,
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
