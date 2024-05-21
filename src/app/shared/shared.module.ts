import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { HeaderComponent } from './header/header.component';
import { FlowbiteComponent } from './flowbite/flowbite.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FlowbiteComponent,
    SearchComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FlowbiteComponent,
    SearchComponent,
    FooterComponent
  ],
})

export class SharedModule { }
