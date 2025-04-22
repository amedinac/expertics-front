import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { UpdateClientComponent } from './components/update-client/update-client.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateOrderComponent,
    CreateClientComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
