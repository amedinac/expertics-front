import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FlowbiteComponent } from './flowbite/flowbite.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FlowbiteComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FlowbiteComponent
  ],
})

export class SharedModule { }
