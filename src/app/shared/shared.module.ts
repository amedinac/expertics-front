import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FlowbiteComponent } from './flowbite/flowbite.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FlowbiteComponent,
    SearchComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FlowbiteComponent,
    SearchComponent,
    FooterComponent
  ],
})

export class SharedModule { }
